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

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "dist")
CHARACTERS_DIR = os.path.join(BASE_DIR, "characters")
MAX_BODY_BYTES = 1_000_000
SAFE_CHARACTER_ID = re.compile(r"^[A-Za-z0-9_-]{1,160}$")

os.makedirs(CHARACTERS_DIR, exist_ok=True)

class PathbuilderHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

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
            except Exception as e:
                self.send_error(500, str(e))
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
            except Exception as e:
                self.send_error(500, str(e))
            return

        return super().do_GET()

    def do_POST(self):
        if self.path == "/api/save_character":
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                if content_length <= 0 or content_length > MAX_BODY_BYTES:
                    self.send_error(413, "Character document must be between 1 byte and 1 MB")
                    return
                body = self.rfile.read(content_length)
                char_data = json.loads(body.decode("utf-8"))
                
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

                with open(filepath, "w", encoding="utf-8") as f:
                    json.dump(char_data, f, indent=2, ensure_ascii=False)

                self.send_response(200)
                self._send_cors_headers()
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "saved", "file": filename, "id": char_id}).encode("utf-8"))
            except Exception as e:
                self.send_error(500, str(e))
            return

        if self.path == "/api/delete_character":
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                body = self.rfile.read(content_length)
                req_data = json.loads(body.decode("utf-8"))
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
            except Exception as e:
                self.send_error(500, str(e))
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
        return super().do_GET()

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
