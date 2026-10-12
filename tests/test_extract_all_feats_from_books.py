import tempfile
import unittest
from pathlib import Path
import sys
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scripts import extract_all_feats_from_books as extractor


class BookDiscoveryTests(unittest.TestCase):
    def test_configured_books_directory_takes_precedence(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / "Livros RPG"
            root.mkdir()
            self.assertEqual(extractor.resolve_books_dir(str(root)), root)

    def test_finds_matching_pdf_in_nested_system_folder(self):
        with tempfile.TemporaryDirectory() as temporary:
            books = Path(temporary)
            nested = books / "Pathfinder" / "Livros"
            nested.mkdir(parents=True)
            expected = nested / "Player Core 2.pdf"
            expected.touch()

            self.assertEqual(extractor.find_book_pdf(books, "player core 2"), expected)

    def test_environment_directory_is_used_when_no_argument_is_passed(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            with patch.dict("os.environ", {"LIVROS_PATH": str(root)}):
                self.assertEqual(extractor.resolve_books_dir(), root)


if __name__ == "__main__":
    unittest.main()
