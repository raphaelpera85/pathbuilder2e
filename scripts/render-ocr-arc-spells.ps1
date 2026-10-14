param(
    [int]$StartPage = 88,
    [int]$EndPage = 93
)

$ErrorActionPreference = 'Stop'
$destDir = Join-Path $PSScriptRoot "..\temp_arcane_spells"
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

$pdfFile = (Get-ChildItem -Path "I:\Meu Drive\Livros RPG\D&D 3.5" -Filter "*Arcano*.pdf" | Select-Object -First 1).FullName
Write-Host "PDF: $pdfFile"

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
} | Select-Object -First 1

$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction'
} | Select-Object -First 1

function Await-Op($asyncOp, [Type]$targetType) {
    $method = $asTaskGeneric.MakeGenericMethod($targetType)
    $task = $method.Invoke($null, @($asyncOp))
    $task.Wait()
    return $task.Result
}

function Await-Action($asyncAction) {
    $task = $asTaskAction.Invoke($null, @($asyncAction))
    $task.Wait()
}

[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Media.Ocr, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrResult, Windows.Media.Ocr, ContentType = WindowsRuntime] | Out-Null

$storageFile = Await-Op ([Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfFile)) ([Windows.Storage.StorageFile])
$pdfDoc = Await-Op ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($storageFile)) ([Windows.Data.Pdf.PdfDocument])

[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null
$lang = [Windows.Globalization.Language]::new("pt-BR")
$ocrEngine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
if (-not $ocrEngine) {
    $ocrEngine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
}

for ($p = $StartPage; $p -le $EndPage; $p++) {
    $pageIndex = $p - 1
    if ($pageIndex -ge $pdfDoc.PageCount) { break }
    
    $pdfPage = $pdfDoc.GetPage($pageIndex)
    $renderOptions = [Windows.Data.Pdf.PdfPageRenderOptions]::new()
    $renderOptions.DestinationWidth = [uint32]2400
    
    $memStream = [Windows.Storage.Streams.InMemoryRandomAccessStream]::new()
    Await-Action ($pdfPage.RenderToStreamAsync($memStream, $renderOptions))
    
    $decoder = Await-Op ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($memStream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $softwareBitmap = Await-Op ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    
    $ocrResult = Await-Op ($ocrEngine.RecognizeAsync($softwareBitmap)) ([Windows.Media.Ocr.OcrResult])
    $text = ($ocrResult.Lines | ForEach-Object { $_.Text }) -join "`r`n"
    
    $outFile = Join-Path $destDir "ocr_p$p.txt"
    Set-Content -Path $outFile -Value $text -Encoding UTF8
    Write-Host "Page $p extracted ($($text.Length) chars)"
    
    $softwareBitmap.Dispose()
    $memStream.Dispose()
    $pdfPage.Dispose()
}
Write-Host "Done extracting spell list pages."
