import {  RunContext as RunContextType } from "@/types/run"
import langMap from "lang-map"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"
import toast from "react-hot-toast"
import { useFileSystem } from "./FileContext"

const RunCodeContext = createContext<RunContextType | null>(null)

const suppLang=[
  {
    "s_no": 1,
    "language": "ALGOL 68",
    "language_code": "algol",
    "versions": [
      { "version": "5.0", "version_index": 0 },
      { "version": "6.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 2,
    "language": "APL",
    "language_code": "apl",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 3,
    "language": "AWK",
    "language_code": "awk",
    "versions": [
      { "version": "5.0", "version_index": 0 },
      { "version": "6.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 4,
    "language": "Ada",
    "language_code": "ada",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 5,
    "language": "Assembler - GCC",
    "language_code": "gccasm",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "3.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 },
      { "version": "6.0", "version_index": 4 }
    ]
  },
  {
    "s_no": 6,
    "language": "Assembler - NASM",
    "language_code": "nasm",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 7,
    "language": "BC",
    "language_code": "bc",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 8,
    "language": "Bash Shell",
    "language_code": "bash",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 9,
    "language": "Befunge",
    "language_code": "befunge",
    "versions": [
      { "version": "5.0", "version_index": 0 },
      { "version": "6.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 10,
    "language": "Brainf**k",
    "language_code": "brainfuck",
    "versions": [
      { "version": "ext:1.1", "version_index": 0 }
    ]
  },
  {
    "s_no": 11,
    "language": "C",
    "language_code": "c",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "2.0", "version_index": 2 },
      { "version": "3.0", "version_index": 3 },
      { "version": "4.0", "version_index": 4 },
      { "version": "5.0", "version_index": 5 },
      { "version": "6.1", "version_index": 6 }
    ]
  },
  {
    "s_no": 12,
    "language": "C#",
    "language_code": "csharp",
    "versions": [
      { "version": "1.3", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 13,
    "language": "C++",
    "language_code": "cpp",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "2.0", "version_index": 2 },
      { "version": "3.0", "version_index": 3 },
      { "version": "4.0", "version_index": 4 },
      { "version": "5.0", "version_index": 5 },
      { "version": "6.1", "version_index": 6 }
    ]
  },
  {
    "s_no": 14,
    "language": "C++ 14",
    "language_code": "cpp14",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 15,
    "language": "C++ 17",
    "language_code": "cpp17",
    "versions": [
      { "version": "4.0", "version_index": 0 },
      { "version": "5.0", "version_index": 1 },
      { "version": "6.1", "version_index": 2 }
    ]
  },
  {
    "s_no": 16,
    "language": "C99",
    "language_code": "c99",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 17,
    "language": "CLISP",
    "language_code": "clisp",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "5.0", "version_index": 5 },
      { "version": "5.0", "version_index": 6 },
      { "version": "5.0", "version_index": 7 },
      { "version": "6.0", "version_index": 8 },
      { "version": "6.0", "version_index": 9 },
      { "version": "6.0", "version_index": 10 },
      { "version": "6.0", "version_index": 11 }
    ]
  },
  {
    "s_no": 18,
    "language": "COBOL - isCOBOL",
    "language_code": "iscobol",
    "versions": [
      { "version": "4.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 19,
    "language": "COW",
    "language_code": "cow",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 20,
    "language": "Clojure",
    "language_code": "clojure",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "3.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 },
      { "version": "6.0", "version_index": 4 }
    ]
  },
  {
    "s_no": 21,
    "language": "Cobol",
    "language_code": "cobol",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 },
      { "version": "6.1", "version_index": 4 }
    ]
  },
  {
    "s_no": 22,
    "language": "CoffeeScript",
    "language_code": "coffeescript",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 23,
    "language": "Crystal",
    "language_code": "crystal",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 24,
    "language": "Csharpdblink",
    "language_code": "csharpdblink",
    "versions": [
      { "version": "/link-db:1.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 25,
    "language": "D",
    "language_code": "d",
    "versions": [
      { "version": "/jdoodle-ext2:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 },
      { "version": "5.0", "version_index": 2 },
      { "version": "6.0", "version_index": 3 }
    ]
  },
  {
    "s_no": 26,
    "language": "Dart",
    "language_code": "dart",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 27,
    "language": "Deno",
    "language_code": "deno",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 28,
    "language": "Elixir",
    "language_code": "elixir",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 29,
    "language": "Erlang",
    "language_code": "erlang",
    "versions": [
      { "version": "4.0", "version_index": 0 },
      { "version": "5.0", "version_index": 1 },
      { "version": "6.0", "version_index": 2 }
    ]
  },
  {
    "s_no": 30,
    "language": "F#",
    "language_code": "fsharp",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 },
      { "version": "6.0", "version_index": 2 }
    ]
  },
  {
    "s_no": 31,
    "language": "FASM",
    "language_code": "fasm",
    "versions": [
      { "version": "5.0", "version_index": 0 },
      { "version": "6.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 32,
    "language": "Factor",
    "language_code": "factor",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "6.0", "version_index": 4 }
    ]
  },
  {
    "s_no": 33,
    "language": "Falcon",
    "language_code": "falcon",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 }
    ]
  },
  {
    "s_no": 34,
    "language": "Fantom",
    "language_code": "fantom",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 }
    ]
  },
  {
    "s_no": 35,
    "language": "Forth",
    "language_code": "forth",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "6.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 36,
    "language": "Fortran",
    "language_code": "fortran",
    "versions": [
      { "version": "ext:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 37,
    "language": "Free Basic",
    "language_code": "freebasic",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 },
      { "version": "5.0", "version_index": 2 },
      { "version": "6.1", "version_index": 3 }
    ]
  },
  {
    "s_no": 38,
    "language": "Go Lang",
    "language_code": "go",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 39,
    "language": "Groovy",
    "language_code": "groovy",
    "versions": [
      { "version": "ext:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 40,
    "language": "Hack",
    "language_code": "hack",
    "versions": [
      { "version": "ext:1.1", "version_index": 0 }
    ]
  },
  {
    "s_no": 41,
    "language": "Haskell",
    "language_code": "haskell",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 42,
    "language": "Haxe",
    "language_code": "haxe",
    "versions": [
      { "version": "5.0", "version_index": 0 },
      { "version": "6.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 43,
    "language": "Icon",
    "language_code": "icon",
    "versions": [
      { "version": "ubuntu:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 },
      { "version": "6.0", "version_index": 2 }
    ]
  },
  {
    "s_no": 44,
    "language": "Intercal",
    "language_code": "intercal",
    "versions": [
      { "version": "ubuntu:1.1", "version_index": 0 }
    ]
  },
  {
    "s_no": 45,
    "language": "Itext",
    "language_code": "itext",
    "versions": [
      { "version": "itext:1.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 46,
    "language": "Itextcsharp",
    "language_code": "itextcsharp",
    "versions": [
      { "version": "itext:1.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 47,
    "language": "JBang",
    "language_code": "jbang",
    "versions": [
      { "version": "jbang:1.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 48,
    "language": "JLang",
    "language_code": "jlang",
    "versions": [
      { "version": "4.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 49,
    "language": "Java",
    "language_code": "java",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 50,
    "language": "Javadblink",
    "language_code": "javadblink",
    "versions": [
      { "version": "link-db:1.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 51,
    "language": "Jelly",
    "language_code": "jelly",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 52,
    "language": "Julia",
    "language_code": "julia",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 53,
    "language": "Kotlin",
    "language_code": "kotlin",
    "versions": [
      { "version": "2.0", "version_index": 0 },
      { "version": "3.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 },
      { "version": "6.1", "version_index": 4 }
    ]
  },
  {
    "s_no": 54,
    "language": "LOLCODE",
    "language_code": "lolcode",
    "versions": [
      { "version": "2.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 55,
    "language": "Lua",
    "language_code": "lua",
    "versions": [
      { "version": "ext:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 },
      { "version": "6.1", "version_index": 4 }
    ]
  },
  {
    "s_no": 56,
    "language": "MoonScript",
    "language_code": "moonscript",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 57,
    "language": "Mozart",
    "language_code": "mozart",
    "versions": [
      { "version": "2.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 58,
    "language": "Nemerle",
    "language_code": "nemerle",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 }
    ]
  },
  {
    "s_no": 59,
    "language": "Nim",
    "language_code": "nim",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 },
      { "version": "6.0", "version_index": 4 }
    ]
  },
  {
    "s_no": 60,
    "language": "NodeJS",
    "language_code": "nodejs",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 },
      { "version": "6.1", "version_index": 6 }
    ]
  },
  {
    "s_no": 61,
    "language": "OCaml",
    "language_code": "ocaml",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 },
      { "version": "5.0", "version_index": 2 },
      { "version": "6.0", "version_index": 3 }
    ]
  },
  {
    "s_no": 62,
    "language": "Objective-C",
    "language_code": "objc",
    "versions": [
      { "version": "ext:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 63,
    "language": "Octave",
    "language_code": "octave",
    "versions": [
      { "version": "ubuntu:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 64,
    "language": "PHP",
    "language_code": "php",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 65,
    "language": "Pascal",
    "language_code": "pascal",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 }
    ]
  },
  {
    "s_no": 66,
    "language": "Perl",
    "language_code": "perl",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 67,
    "language": "Phpdblink",
    "language_code": "phpdblink",
    "versions": [
      { "version": "link-db:1.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 68,
    "language": "Picolisp",
    "language_code": "picolisp",
    "versions": [
      { "version": "ubuntu:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 69,
    "language": "Pike",
    "language_code": "pike",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 70,
    "language": "Prolog",
    "language_code": "prolog",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 },
      { "version": "5.0", "version_index": 2 },
      { "version": "6.1", "version_index": 3 }
    ]
  },
  {
    "s_no": 71,
    "language": "Python 2",
    "language_code": "python2",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "3.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "6.1", "version_index": 3 }
    ]
  },
  {
    "s_no": 72,
    "language": "Python 3",
    "language_code": "python3",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 73,
    "language": "Python3dblink",
    "language_code": "python3dblink",
    "versions": [
      { "version": "link-db:1.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 74,
    "language": "R Language",
    "language_code": "r",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 75,
    "language": "Racket",
    "language_code": "racket",
    "versions": [
      { "version": "2.0", "version_index": 0 },
      { "version": "3.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 }
    ]
  },
  {
    "s_no": 76,
    "language": "Raku",
    "language_code": "raku",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 77,
    "language": "Rhino JS",
    "language_code": "rhino",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 },
      { "version": "5.0", "version_index": 2 },
      { "version": "6.0", "version_index": 3 }
    ]
  },
  {
    "s_no": 78,
    "language": "Ruby",
    "language_code": "ruby",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 79,
    "language": "Rust",
    "language_code": "rust",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 80,
    "language": "SQL",
    "language_code": "sql",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 81,
    "language": "Scala",
    "language_code": "scala",
    "versions": [
      { "version": "1.4", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 82,
    "language": "Scheme",
    "language_code": "scheme",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 },
      { "version": "6.0", "version_index": 4 }
    ]
  },
  {
    "s_no": 83,
    "language": "Smalltalk",
    "language_code": "smalltalk",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 }
    ]
  },
  {
    "s_no": 84,
    "language": "SpiderMonkey",
    "language_code": "spidermonkey",
    "versions": [
      { "version": "ext3:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "6.0", "version_index": 2 }
    ]
  },
  {
    "s_no": 85,
    "language": "Swift",
    "language_code": "swift",
    "versions": [
      { "version": "ext:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 86,
    "language": "TASM",
    "language_code": "tasm",
    "versions": [
      { "version": "6.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 87,
    "language": "Tcl",
    "language_code": "tcl",
    "versions": [
      { "version": "ext:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.0", "version_index": 5 }
    ]
  },
  {
    "s_no": 88,
    "language": "TypeScript",
    "language_code": "typescript",
    "versions": [
      { "version": "6.1", "version_index": 0 }
    ]
  },
  {
    "s_no": 89,
    "language": "Unlambda",
    "language_code": "unlambda",
    "versions": [
      { "version": "ubuntu:1.1", "version_index": 0 },
      { "version": "5.0", "version_index": 1 }
    ]
  },
  {
    "s_no": 90,
    "language": "VB.Net",
    "language_code": "vbn",
    "versions": [
      { "version": "1.3", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "3.0", "version_index": 2 },
      { "version": "4.0", "version_index": 3 },
      { "version": "5.0", "version_index": 4 },
      { "version": "6.1", "version_index": 5 }
    ]
  },
  {
    "s_no": 91,
    "language": "Verilog",
    "language_code": "verilog",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "2.0", "version_index": 1 },
      { "version": "4.0", "version_index": 2 },
      { "version": "5.0", "version_index": 3 },
      { "version": "6.1", "version_index": 4 }
    ]
  },
  {
    "s_no": 92,
    "language": "Whitespace",
    "language_code": "whitespace",
    "versions": [
      { "version": "2.0", "version_index": 0 }
    ]
  },
  {
    "s_no": 93,
    "language": "YaBasic",
    "language_code": "yabasic",
    "versions": [
      { "version": "ext2:1.1", "version_index": 0 },
      { "version": "4.0", "version_index": 1 },
      { "version": "6.0", "version_index": 2 }
    ]
  }
]



export const useRunCode = () => {
    const context = useContext(RunCodeContext)
    if (context === null) {
        throw new Error(
            "useRunCode must be used within a RunCodeContextProvider",
        )
    }
    return context
}

const RunCodeContextProvider = ({ children }: { children: ReactNode }) => {
    const { activeFile } = useFileSystem()
    const [input, setInput] = useState<string>("")
    const [output, setOutput] = useState<string>("")
    const [isRunning, setIsRunning] = useState<boolean>(false)
    
    const [supportedLanguages] = useState<any[]>(suppLang)
    
    const [selectedLanguage, setSelectedLanguage] = useState<any>({
        language_code: "",
        version: "",
        version_index: 0,
        languageName: ""
    })

    /* CHANGE: Dependency changed to activeFile to trigger sync on every tab switch */
    useEffect(() => {
        if (supportedLanguages.length === 0 || !activeFile?.name) return

        const extension = activeFile.name.split(".").pop()
        if (extension) {
            const mappedLangNames = langMap.languages(extension)
            
            const matchedLang = supportedLanguages.find(
                (lang) =>
                    lang.language_code === extension || 
                    mappedLangNames.some(name => name.toLowerCase() === lang.language.toLowerCase())
            )

            if (matchedLang) {
                const latestVersion = matchedLang.versions[matchedLang.versions.length - 1]
                setSelectedLanguage({
                    language_code: matchedLang.language_code,
                    version: latestVersion.version,
                    version_index: latestVersion.version_index,
                    languageName: matchedLang.language
                })
            }
        } else {
            setSelectedLanguage({ language_code: "", version: "", version_index: 0, languageName: "" })
        }
    }, [activeFile, supportedLanguages])

    const runCode = async () => {
        try {
            if (!selectedLanguage.language_code) {
                return toast.error("Please select a language to run the code")
            } else if (!activeFile) {
                return toast.error("Please open a file to run the code")
            } else {
                toast.loading("Running code...")
            }

            setIsRunning(true)

            const clientId1 = import.meta.env.VITE_JDOODLE_CLIENT_ID
            const clientSecret1 = import.meta.env.VITE_JDOODLE_CLIENT_SECRET

            const response = await fetch('/jdoodle-api/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientId: clientId1,
                    clientSecret: clientSecret1,
                    script: activeFile.content,
                    language: selectedLanguage.language_code,
                    versionIndex: selectedLanguage.version_index,
                    stdin: input 
                })
            });

            const data = await response.json();

            if (data.error) {
                setOutput(`Error: ${data.error}`)
            } else {
                setOutput(data.output)
            }

            setIsRunning(false)
            toast.dismiss()
        } catch (error: any) {
            console.error(error)
            setIsRunning(false)
            toast.dismiss()
            toast.error("Failed to run the code")
        }
    }

    return (
        <RunCodeContext.Provider
            value={{
                setInput,
                output,
                isRunning,
                supportedLanguages,
                selectedLanguage,
                setSelectedLanguage,
                runCode,
            }}
        >
            {children}
        </RunCodeContext.Provider>
    )
}

export { RunCodeContextProvider }
export default RunCodeContext