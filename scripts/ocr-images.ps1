param([string]$Dir = "temp_adv_ocr", [string]$Pattern = "p_*_300.png")

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
} | Select-Object -First 1

function Await-Op($asyncOp, [Type]$targetType) {
    $method = $asTaskGeneric.MakeGenericMethod($targetType)
    $task = $method.Invoke($null, @($asyncOp))
    $task.Wait()
    return $task.Result
}

[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType = WindowsRuntime] | Out-Null

$lang = [Windows.Globalization.Language]::new("pt-BR")
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
if (-not $engine) {
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
}

$images = Get-ChildItem "$Dir\$Pattern" | Sort-Object { [int]($_.BaseName -replace '\D') }
foreach ($img in $images) {
    $file = Await-Op ([Windows.Storage.StorageFile]::GetFileFromPathAsync($img.FullName)) ([Windows.Storage.StorageFile])
    $stream = Await-Op ($file.OpenAsync(0)) ([Windows.Storage.Streams.IRandomAccessStream])
    $dec = Await-Op ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bm = Await-Op ($dec.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $res = Await-Op ($engine.RecognizeAsync($bm)) ([Windows.Media.Ocr.OcrResult])
    
    $outTxt = [System.IO.Path]::ChangeExtension($img.FullName, ".txt")
    $allText = ($res.Lines | ForEach-Object { $_.Text }) -join "`r`n"
    [System.IO.File]::WriteAllText($outTxt, $allText, [System.Text.Encoding]::UTF8)
    
    $firstLines = ($res.Lines | Select-Object -First 3 | ForEach-Object { $_.Text }) -join " // "
    Write-Host "$($img.Name): $firstLines"
    
    $stream.Dispose()
}
