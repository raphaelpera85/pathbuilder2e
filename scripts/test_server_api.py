"""Teste de integração local para os endpoints de fichas."""

import http.client
import importlib
import json
import pathlib
import socketserver
import sys
import tempfile
import threading
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1]))


class LocalCharacterApiTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp_dir = tempfile.TemporaryDirectory()
        root = pathlib.Path(cls.temp_dir.name)
        cls.static_dir = root / "dist"
        cls.characters_dir = root / "characters"
        cls.static_dir.mkdir()
        cls.characters_dir.mkdir()
        (cls.static_dir / "index.html").write_text("ok", encoding="utf-8")

        cls.server_module = importlib.import_module("server")
        cls.original_static_dir = cls.server_module.STATIC_DIR
        cls.original_characters_dir = cls.server_module.CHARACTERS_DIR
        cls.server_module.STATIC_DIR = str(cls.static_dir)
        cls.server_module.CHARACTERS_DIR = str(cls.characters_dir)
        cls.httpd = socketserver.ThreadingTCPServer(
            ("127.0.0.1", 0), cls.server_module.PathbuilderHandler
        )
        cls.thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()
        cls.server_module.STATIC_DIR = cls.original_static_dir
        cls.server_module.CHARACTERS_DIR = cls.original_characters_dir
        cls.temp_dir.cleanup()

    def request(self, method, path, body=None, headers=None):
        connection = http.client.HTTPConnection(
            "127.0.0.1", self.httpd.server_address[1], timeout=3
        )
        try:
            connection.request(method, path, body=body, headers=headers or {})
            response = connection.getresponse()
            return response.status, dict(response.getheaders()), response.read()
        finally:
            connection.close()

    def test_save_get_delete_and_cors(self):
        status, headers, _ = self.request(
            "OPTIONS",
            "/api/save_character",
            headers={"Origin": "http://localhost:5173"},
        )
        self.assertEqual(status, 204)
        self.assertEqual(headers.get("Access-Control-Allow-Origin"), "http://localhost:5173")

        character = {"id": "security-check", "name": "Teste", "level": 1}
        status, _, _ = self.request(
            "POST",
            "/api/save_character",
            body=json.dumps(character).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        self.assertEqual(status, 200)

        status, _, body = self.request("GET", "/api/characters/security-check")
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(body)["name"], "Teste")

        status, _, _ = self.request("DELETE", "/api/characters/security-check")
        self.assertEqual(status, 200)

    def test_rejects_invalid_json_and_oversized_body(self):
        status, _, _ = self.request(
            "POST",
            "/api/save_character",
            body=b"{bad",
            headers={"Content-Type": "application/json"},
        )
        self.assertEqual(status, 400)

        connection = http.client.HTTPConnection(
            "127.0.0.1", self.httpd.server_address[1], timeout=3
        )
        try:
            connection.putrequest("POST", "/api/save_character")
            connection.putheader("Content-Length", str(self.server_module.MAX_BODY_BYTES + 1))
            connection.endheaders()
            response = connection.getresponse()
            response.read()
            self.assertEqual(response.status, 413)
        finally:
            connection.close()

    def test_rejects_path_traversal_and_unknown_delete_route(self):
        status, _, _ = self.request("GET", "/api/characters/..%2Fsecret")
        self.assertEqual(status, 400)
        status, _, _ = self.request("DELETE", "/api/unknown")
        self.assertEqual(status, 404)


if __name__ == "__main__":
    unittest.main(verbosity=2)
