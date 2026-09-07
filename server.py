"""
Pathbuilder 2e Local - Servidor HTTP e API de Personagens
Executa um servidor local em http://localhost:8080 e abre o navegador automaticamente.
"""

import http.server
import socketserver
import os
import json
import webbrowser
import threading
import sys
import re
import tempfile

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "dist")
CHARACTERS_DIR = os.path.join(BASE_DIR, "characters")
MAX_BODY_BYTES = 1_000_000
SAFE_CHARACTER_ID = re.compile(r"^[A-Za-z0-9_-]{1,160}$")
ALLOWED_ORIGINS = {
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:8080",
    "http://localhost:8080",
}

os.makedirs(CHARACTERS_DIR, exist_ok=True)


class ClientInputError(ValueError):
    status = 400


class PayloadTooLargeError(ClientInputError):
    status = 413

class PathbuilderHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def _send_cors_headers(self):
        origin = self.headers.get("Origin")
        if origin in ALLOWED_ORIGINS:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def _read_json_body(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
        except (TypeError, ValueError):
            raise ClientInputError("Invalid request body")
        if content_length <= 0:
            raise ClientInputError("Request body is required")
        if content_length > MAX_BODY_BYTES:
            raise PayloadTooLargeError("Request body exceeds the character limit")
        body = self.rfile.read(content_length)
        if len(body) != content_length:
            raise ClientInputError("Incomplete request body")
        try:
            value = json.loads(body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            raise ClientInputError("Invalid JSON body")
        if not isinstance(value, dict):
            raise ClientInputError("Character document must be a JSON object")
        return value

    def _send_client_error(self, error):
        self.send_error(getattr(error, "status", 400), str(error))

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/characters":
            try:
                files = [f.replace(".json", "") for f in os.listdir(CHARACTERS_DIR) if f.endswith(".json")]
                self.send_response(200)
                self._send_cors_headers()
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"characters": files}).encode("utf-8"))
            except ClientInputError as e:
                self._send_client_error(e)
            except Exception:
                self.send_error(500, "Internal server error")
            return

        if self.path.startswith("/api/characters/"):
            char_id = self.path[len("/api/characters/"):].strip()
            if not SAFE_CHARACTER_ID.fullmatch(char_id):
                self.send_error(400, "Invalid character id")
                return
            filepath = os.path.realpath(os.path.join(CHARACTERS_DIR, f"{char_id}.json"))
            characters_root = os.path.realpath(CHARACTERS_DIR)
            if os.path.commonpath((characters_root, filepath)) != characters_root or not os.path.exists(filepath):
                self.send_error(404, "Character not found")
                return
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                self.send_response(200)
                self._send_cors_headers()
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))
            except ClientInputError as e:
                self._send_client_error(e)
            except Exception:
                self.send_error(500, "Internal server error")
            return

        return super().do_GET()

    def do_POST(self):
        if self.path == "/api/save_character":
            try:
                char_data = self._read_json_body()
                
                char_id = str(char_data.get("id") or char_data.get("name", "character").replace(" ", "_"))
                if not SAFE_CHARACTER_ID.fullmatch(char_id):
                    self.send_error(400, "Invalid character id")
                    return
                filename = f"{char_id}.json"
                filepath = os.path.realpath(os.path.join(CHARACTERS_DIR, filename))
                characters_root = os.path.realpath(CHARACTERS_DIR)
                if os.path.commonpath((characters_root, filepath)) != characters_root:
                    self.send_error(400, "Invalid character path")
                    return

                # Replace atomically so an interrupted save cannot leave a
                # truncated character document behind.
                with tempfile.NamedTemporaryFile(
                    mode="w", encoding="utf-8", dir=CHARACTERS_DIR,
                    prefix=f".{char_id}.", suffix=".tmp", delete=False,
                ) as temp_file:
                    json.dump(char_data, temp_file, indent=2, ensure_ascii=False)
                    temp_path = temp_file.name
                os.replace(temp_path, filepath)

                self.send_response(200)
                self._send_cors_headers()
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "saved", "file": filename, "id": char_id}).encode("utf-8"))
            except ClientInputError as e:
                self._send_client_error(e)
            except Exception:
                self.send_error(500, "Internal server error")
            return

        if self.path == "/api/delete_character":
            try:
                req_data = self._read_json_body()
                char_id = str(req_data.get("id", ""))
                if not SAFE_CHARACTER_ID.fullmatch(char_id):
                    self.send_error(400, "Invalid character id")
                    return
                filename = f"{char_id}.json"
                filepath = os.path.realpath(os.path.join(CHARACTERS_DIR, filename))
                characters_root = os.path.realpath(CHARACTERS_DIR)
                if os.path.commonpath((characters_root, filepath)) != characters_root or not os.path.exists(filepath):
                    self.send_error(404, "Character not found")
                    return
                os.remove(filepath)
                self.send_response(200)
                self._send_cors_headers()
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "deleted", "id": char_id}).encode("utf-8"))
            except ClientInputError as e:
                self._send_client_error(e)
            except Exception:
                self.send_error(500, "Internal server error")
            return

        return super().do_POST()

    def do_DELETE(self):
        if self.path.startswith("/api/characters/"):
            char_id = self.path[len("/api/characters/"):].strip()
            if not SAFE_CHARACTER_ID.fullmatch(char_id):
                self.send_error(400, "Invalid character id")
                return
            filepath = os.path.realpath(os.path.join(CHARACTERS_DIR, f"{char_id}.json"))
            characters_root = os.path.realpath(CHARACTERS_DIR)
            if os.path.commonpath((characters_root, filepath)) != characters_root or not os.path.exists(filepath):
                self.send_error(404, "Character not found")
                return
            try:
                os.remove(filepath)
                self.send_response(200)
                self._send_cors_headers()
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "deleted", "id": char_id}).encode("utf-8"))
            except Exception as e:
                self.send_error(500, str(e))
            return
        self.send_error(404, "Not found")

def open_browser():
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    if not os.path.isdir(STATIC_DIR):
        print("[ERRO] Build React não encontrado. Execute: npm run build")
        sys.exit(1)

    print("=" * 60)
    print(" ⚔️ PATHBUILDER 2E LOCAL — SERVIDOR INICIADO")
    print(f" 🌐 Acesse no seu navegador: http://localhost:{PORT}")
    print(f" 📁 Pasta do Projeto: {BASE_DIR}")
    print("=" * 60)

    # Abre o navegador após 1 segundo
    threading.Timer(1.2, open_browser).start()

    # Inicia o servidor HTTP
    with socketserver.TCPServer(("127.0.0.1", PORT), PathbuilderHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor encerrado.")
            sys.exit(0)
