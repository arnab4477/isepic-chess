isepic-chess.js
================

`isepic-chess.js` is a chess utility library written in JavaScript, it provides features like legal moves calculation, FEN position validation, storing SAN moves, etc. (see: [Features](https://github.com/ajax333221/isepic-chess#features)).

**Note:** As of `v2.6.0`<sup>(April, 2020)</sup>, everything visual (HTML board, move animations, etc.) is now developed separately at [isepic-chess-ui (GitHub repo)](https://github.com/ajax333221/isepic-chess-ui), this means that the core library no longer depends on jQuery and can be used as a stand-alone command-line.

Demo
-------------

https://ajax333221.github.io/isepic-chess/

Features
-------------

- Advanced FEN validation
- Get legal moves
- Material difference
- Multiple boards at once
- Pawn promotion options
- Checkmate / Stalemate
- Store SAN moves
- ASCII diagram
- Extense parameter-flexibility

Documentation
-------------

#### List of `Ic.<methods>(...)`:

Isepic Chess library `isepic-chess.js` has the following available methods.

Function | Parameters | Return | Description
-------- | ---------- | ------ | -----------
**setSilentMode**(<br>*val*<br>) | <ul><li>val (Boolean)</li></ul> | - | Enables/disables the silent mode to show/hide `console.log()` messages.<br><br>The silent mode is internally set to `true` by default.<hr>Examples:<ul><li>`Ic.setSilentMode(true)`</li><li>`Ic.setSilentMode(false)`</li></ul>
**boardExists**(<br>*board*<br>) | <ul><li>board:<ul><li>**boardObj** (Object)</li><li>**boardName** (String)</li></ul></li></ul> | Boolean | Test to see if a **board** exists or not.<hr>Examples:<ul><li>`Ic.boardExists(myboard) //true`</li><li>`Ic.boardExists(nonexistent) //false`</li><li>`Ic.boardExists("myboard") //true`</li><li>`Ic.boardExists("nonexistent") //false`</li></ul>
**selectBoard**(<br>*board*<br>) | <ul><li>board:<ul><li>**boardObj** (Object)</li><li>**boardName** (String)</li></ul></li></ul> | Success:<ul><li>**boardObj** (Object)</li></ul><hr>:small_red_triangle_down:Error:<ul><li>null</li></ul> | Returns a **board** (usually to call [board methods](https://github.com/ajax333221/isepic-chess#list-of-boardmethods) or access [board properties](https://github.com/ajax333221/isepic-chess#list-of-boardproperties)).<hr>Examples:<ul><li>`Ic.selectBoard(myboard) //Object{...}`</li><li>`Ic.selectBoard(nonexistent) //null`</li><li>`Ic.selectBoard("myboard") //Object{...}`</li><li>`Ic.selectBoard("nonexistent") //null`</li></ul><hr>:small_red_triangle_down:Error emits a `console.log(...)` if the *board* is not found.
**toVal**(<br>*qal*<br>) | <ul><li>qal:<ul><li>**pieceBal** (String)</li><li>**pieceAbsBal** (String)</li><li>**pieceVal** (Number)</li><li>**pieceAbsVal** (Number)</li></ul></li></ul> | Success:<ul><li>**pieceVal** (Number): `-6 to 6`</li></ul><hr>Error:<ul><li>Number: `0`</li></ul> | Converts the input to a **piece val**.<hr>Examples:<ul><li>`Ic.toVal("b") //-3`</li><li>`Ic.toVal("K") //6`</li><li>`Ic.toVal("*") //0`</li><li>`Ic.toVal(-5) //-5`</li><li>`Ic.toVal("err") //0`</li><li>`Ic.toVal(99) //6`</li><li>`Ic.toVal(-99) //-6`</li></ul>
**toAbsVal**(<br>*qal*<br>) | <ul><li>qal:<ul><li>**pieceBal** (String)</li><li>**pieceAbsBal** (String)</li><li>**pieceVal** (Number)</li><li>**pieceAbsVal** (Number)</li></ul></li></ul> | Success:<ul><li>**pieceAbsVal** (Number): `0 to 6`</li></ul><hr>Error:<ul><li>Number: `0`</li></ul> | Converts the input to a **piece abs val**.<hr>Examples:<ul><li>`Ic.toAbsVal("b") //3`</li><li>`Ic.toAbsVal("K") //6`</li><li>`Ic.toAbsVal("*") //0`</li><li>`Ic.toAbsVal(-5) //5`</li><li>`Ic.toAbsVal("err") //0`</li><li>`Ic.toAbsVal(99) //6`</li><li>`Ic.toAbsVal(-99) //6`</li></ul>
**toBal**(<br>*qal*<br>) | <ul><li>qal:<ul><li>**pieceBal** (String)</li><li>**pieceAbsBal** (String)</li><li>**pieceVal** (Number)</li><li>**pieceAbsVal** (Number)</li></ul></li></ul> | Success:<ul><li>**pieceBal** (String): `"k", "q", "r", "b", "n", "p", "*", "P", "N", "B", "R", "Q", "K"`</li></ul><hr>Error:<ul><li>String: `*`</li></ul> | Converts the input to a **piece bal**.<hr>Examples:<ul><li>`Ic.toBal(-3) //"b"`</li><li>`Ic.toBal(6) //"K"`</li><li>`Ic.toBal(0) //"*"`</li><li>`Ic.toBal("q") //"q"`</li><li>`Ic.toBal("err") //"*"`</li><li>`Ic.toBal(99) //"K"`</li><li>`Ic.toBal(-99) //"k"`</li></ul>
**toAbsBal**(<br>*qal*<br>) | <ul><li>qal:<ul><li>**pieceBal** (String)</li><li>**pieceAbsBal** (String)</li><li>**pieceVal** (Number)</li><li>**pieceAbsVal** (Number)</li></ul></li></ul> | Success:<ul><li>**pieceAbsBal** (String): `"*", "P", "N", "B", "R", "Q", "K"`</li></ul><hr>Error:<ul><li>String: `*`</li></ul> | Converts the input to a **piece abs bal**.<hr>Examples:<ul><li>`Ic.toAbsBal(-3) //"B"`</li><li>`Ic.toAbsBal(6) //"K"`</li><li>`Ic.toAbsBal(0) //"*"`</li><li>`Ic.toAbsBal("q") //"Q"`</li><li>`Ic.toAbsBal("err") //"*"`</li><li>`Ic.toAbsBal(99) //"K"`</li><li>`Ic.toAbsBal(-99) //"K"`</li></ul>
**toPieceClass**(<br>*qal*<br>) | <ul><li>qal:<ul><li>**pieceBal** (String)</li><li>**pieceAbsBal** (String)</li><li>**pieceVal** (Number)</li><li>**pieceAbsVal** (Number)</li></ul></li></ul> | Success:<ul><li>**pieceClass** (String): `"bk", "bq", "br", "bb", "bn", "bp", "", "wp", "wn", "wb", "wr", "wq", "wk"`</li></ul><hr>Error:<ul><li>String: `""`</li></ul> | Converts the input to a **piece class**.<hr>Examples:<ul><li>`Ic.toPieceClass("b") //"bb"`</li><li>`Ic.toPieceClass("K") //"wk"`</li><li>`Ic.toPieceClass("*") //""`</li><li>`Ic.toPieceClass(-5) //"bq"`</li><li>`Ic.toPieceClass("err") //""`</li><li>`Ic.toPieceClass(99) //"wk"`</li><li>`Ic.toPieceClass(-99) //"bk"`</li></ul>
**toBos**(<br>*qos*<br>) | <ul><li>qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | On valid input:<ul><li>**squareBos** (String): `"a1" to "h8"`</li></ul><hr>On bad input:<ul><li>**unknown** (?): `?`</li></ul> | Converts the input to a **square bos**.<hr>Examples:<ul><li>`Ic.toBos([7, 0]) //"a1"`</li><li>`Ic.toBos([0, 0]) //"a8"`</li><li>`Ic.toBos([7, 7]) //"h1"`</li><li>`Ic.toBos([0, 7]) //"h8"`</li><li>`Ic.toBos("B2") //"b2"`</li></ul>
**toPos**(<br>*qos*<br>) | <ul><li>qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | On valid input:<ul><li>**squarePos** (Array): `[0-7, 0-7]`</li></ul><hr>On bad input:<ul><li>**unknown** (?): `?`</li></ul> | Converts the input to a **square pos**.<hr>Examples:<ul><li>`Ic.toPos("a1") //[7, 0]`</li><li>`Ic.toPos("a8") //[0, 0]`</li><li>`Ic.toPos("h1") //[7, 7]`</li><li>`Ic.toPos("h8") //[0, 7]`</li><li>`Ic.toPos([6, 1]) //[6, 1]`</li></ul>
**getSign**(<br>*zal*<br>) | <ul><li>zal:<ul><li>Boolean</li><li>qal:<ul><li>**pieceBal** (String)</li><li>**pieceAbsBal** (String)</li><li>**pieceVal** (Number)</li><li>**pieceAbsVal** (Number)</li></ul></li></ul></li></ul> | Success:<ul><li>**pieceSign** (Number): `-1 or 1`</li></ul><hr>Error:<ul><li>Number: `-1`</li></ul> | Infers the **piece sign** from a Boolean or a **piece qal**.<br><br>Boolean value `true` returns a negative sign (`-1`) and `false` a positive sign (`1`), the Boolean is meant to be the answer to *"is black the active color?"* (this way it can be used with `board.Active.isBlack`).<br><br>Any non-Boolean value will pass through `toVal()` and have its **piece val** tested to a greater-than-zero comparison. White pieces have a positive sign (`1`) and empty squares/black pieces a negative sign (`-1`).<hr>Examples:<ul><li>`Ic.getSign("q") //-1`</li><li>`Ic.getSign("Q") //1`</li><li>`Ic.getSign(true) //-1`</li><li>`Ic.getSign(false) //1`</li><li>`Ic.getSign("err") //-1`</li></ul>
**getRankPos**(<br>*qos*<br>) | <ul><li>qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | On valid input:<ul><li>**rankPos** (Number): `0-7`</li></ul><hr>On bad input:<ul><li>**unknown** (?): `?`</li></ul> | Converts the input to a **rank pos**.<hr>Examples:<ul><li>`Ic.getRankPos("a1") //7`</li><li>`Ic.getRankPos("a8") //0`</li><li>`Ic.getRankPos("h1") //7`</li><li>`Ic.getRankPos("h8") //0`</li><li>`Ic.getRankPos([3, 6]) //3`</li><li>`Ic.getRankPos([6, 3]) //6`</li></ul>
**getFilePos**(<br>*qos*<br>) | <ul><li>qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | On valid input:<ul><li>**filePos** (Number): `0-7`</li></ul><hr>On bad input:<ul><li>**unknown** (?): `?`</li></ul> | Converts the input to a **file pos**.<hr>Examples:<ul><li>`Ic.getFilePos("a1") //0`</li><li>`Ic.getFilePos("a8") //0`</li><li>`Ic.getFilePos("h1") //7`</li><li>`Ic.getFilePos("h8") //7`</li><li>`Ic.getFilePos([3, 6]) //6`</li><li>`Ic.getFilePos([6, 3]) //3`</li></ul>
**getRankBos**(<br>*qos*<br>) | <ul><li>qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | On valid input:<ul><li>**rankBos** (String): `1-8`</li></ul><hr>On bad input:<ul><li>**unknown** (?): `?`</li></ul> | Converts the input to a **rank bos**.<hr>Examples:<ul><li>`Ic.getRankBos("a1") //"1"`</li><li>`Ic.getRankBos("a8") //"8"`</li><li>`Ic.getRankBos("h1") //"1"`</li><li>`Ic.getRankBos("h8") //"8"`</li><li>`Ic.getRankBos([3, 6]) //"5"`</li><li>`Ic.getRankBos([6, 3]) //"2"`</li></ul>
**getFileBos**(<br>*qos*<br>) | <ul><li>qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | On valid input:<ul><li>**fileBos** (String): `a-h`</li></ul><hr>On bad input:<ul><li>**unknown** (?): `?`</li></ul> | Converts the input to a **file bos**.<hr>Examples:<ul><li>`Ic.getFileBos("a1") //"a"`</li><li>`Ic.getFileBos("a8") //"a"`</li><li>`Ic.getFileBos("h1") //"h"`</li><li>`Ic.getFileBos("h8") //"h"`</li><li>`Ic.getFileBos([3, 6]) //"g"`</li><li>`Ic.getFileBos([6, 3]) //"d"`</li></ul>
**isInsideBoard**(<br>*qos*<br>) | <ul><li>qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | Boolean | Test to see if a square is valid or not.<hr>Examples:<ul><li>`Ic.isInsideBoard("a1") //true`</li><li>`Ic.isInsideBoard("a9") //false`</li><li>`Ic.isInsideBoard("i3") //false`</li><li>`Ic.isInsideBoard([7, 7]) //true`</li><li>`Ic.isInsideBoard([8, 8]) //false`</li></ul>
**sameSquare**(<br>*qos1*,<br>*qos2*<br>) | <ul><li>qos1:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li><li>qos2:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | Boolean | Test to see if two squares evaluate to the same square or not.<hr>Examples:<ul><li>`Ic.sameSquare("a1", "a1") //true`</li><li>`Ic.sameSquare("d2", [6, 3]) //true`</li><li>`Ic.sameSquare([4, 5], [5, 4]) //false`</li></ul>
**removeBoard**(<br>*board*<br>) | <ul><li>board:<ul><li>**boardObj** (Object)</li><li>**boardName** (String)</li></ul></li></ul> | Boolean | Removes a **board** completely.<hr>Examples:<ul><li>`Ic.removeBoard(myboard) //true`</li><li>`Ic.removeBoard(nonexistent) //false`</li><li>`Ic.removeBoard("myboard") //true`</li><li>`Ic.removeBoard("nonexistent") //false`</li></ul>
**isEqualBoard**(<br>*leftBoard*,<br>*rightBoard*<br>) | <ul><li>leftBoard:<ul><li>**boardObj** (Object)</li><li>**boardName** (String)</li></ul></li><li>rightBoard:<ul><li>**boardObj** (Object)</li><li>**boardName** (String)</li></ul></li></ul> | Success:<ul><li>Boolean</li></ul><hr>:small_red_triangle_down:Error:<ul><li>Boolean: `false`</li></ul> | Tests for the equality of all mutable properties between two **board**s (`board.BoardName` is not tested).<hr>Examples:<ul><li>`Ic.isEqualBoard("board", "board_copy") //true`</li><li>`Ic.isEqualBoard(same_board, same_board) //true`</li><li>`Ic.isEqualBoard("board", "other_board") //false`</li><li>`Ic.isEqualBoard(other_board, "nonexistent_board") //false`</li></ul><hr>:small_red_triangle_down:Error emits a `console.log(...)` when:<ul><li>the *left board* is not found.</li><li>the *right board* is not found.</li></ul>
**cloneBoard**(<br>*toBoard*,<br>*fromBoard*<br>) | <ul><li>toBoard:<ul><li>**boardObj** (Object)</li><li>**boardName** (String)</li></ul></li><li>fromBoard:<ul><li>**boardObj** (Object)</li><li>**boardName** (String)</li></ul></li></ul> | Success:<ul><li>Boolean: `true`</li></ul><hr>:small_red_triangle_down:Error:<ul><li>Boolean: `false`</li></ul> | Clones all the mutable properties of a **board** to another **board** (`board.BoardName` is not copied).<hr>Examples:<ul><li>`Ic.cloneBoard(to_board, from_board) //true`</li><li>`Ic.cloneBoard(to_board, from_nonexistent) //false`</li><li>`Ic.cloneBoard("to_nonexistent", from_board) //false`</li><li>`Ic.cloneBoard(to_nonexistent, "from_nonexistent") //false`</li></ul><hr>:small_red_triangle_down:Error emits a `console.log(...)` when:<ul><li>the *to board* is not found.</li><li>the *from board* is not found.</li></ul>
**initBoard**(<br>*p*<br>) | <ul><li>p (Object):<ul><li>:eight_spoked_asterisk:boardName (String)</li><li>:eight_spoked_asterisk:fen (String)</li><li>:eight_spoked_asterisk:isRotated (Boolean)</li><li>:eight_spoked_asterisk:isHidden (Boolean)</li><li>:eight_spoked_asterisk:promoteTo:<ul><li>**pieceBal** (String)</li><li>**pieceAbsBal** (String)</li><li>**pieceVal** (Number)</li><li>**pieceAbsVal** (Number)</li></ul></li><li>:eight_spoked_asterisk:invalidFenStop (Boolean)</li></ul></li></ul><hr>:eight_spoked_asterisk:Optional Object keys | Success:<ul><li>**boardObj** (Object)</li></ul><hr>:small_red_triangle_down:Error:<ul><li>null</li></ul> | Initializes/overwrites a :pushpin:**board**.<br><br>`isRotated = true` rotates the **board** to be displayed as black view.<br><br>`isHidden = true` prevents visual display or anything DOM-related when **isepic-chess-ui.js** is present (the flag becomes irrelevant otherwise).<br><br>`invalidFenStop = true` prevents the use of **default fen position**s when the **original fen** fails, ensuring that either `null` or a **board** with the **original fen** is returned.<br><br>The Boolean options (`isRotated`, `isHidden` and `invalidFenStop`) default to `false` if they are not set a Boolean value of `true`.<br><br>`promoteTo` passes through `toAbsVal()`, any empty or invalid values will turn to `0` and default to `5` (queen), valid values out of bounds will stop at min of `2` (bishop) and max of `5` (queen).<br><br>If `boardName` is not a String (or is one but resolves to `""` after removing spaces), a **default board name** will be set (`board_<timestamp>`).<br><br>The **board name** will have any non-Alphanumeric values turned into underscores.<br><br>When using a **board name** that is already in use, the **board** with that **board name** will be used instead of creating a new **board** (old references to that **board** will continue to work).<br><br>If `fen` is not a String (or is one but is an **invalid fen**), and `invalidFenStop` is not active, then the **default fen position** will be used.<hr>Examples:<ul><li>`Ic.initBoard({ boardName : "main" }) //Object{...}`</li><li>`Ic.initBoard({ fen : "8/k7/P7/K7/8/8/8/8 b - - 0 1", isRotated : true, promoteTo : "b" }) //Object{...}`</li><li>`Ic.initBoard({ fen : "0invalidfen0", invalidFenStop : true }) //null`</li></ul><hr>:pushpin:Board documentation links:<ul><li>[board properties](https://github.com/ajax333221/isepic-chess#list-of-boardproperties).</li><li>[board methods](https://github.com/ajax333221/isepic-chess#list-of-boardmethods).</li></ul><hr>:small_red_triangle_down:Error emits a `console.log(...)` when:<ul><li>`invalidFenStop` is `true` and the *fen* fails the **basic fen test**.</li><li>the *board* creation fails.</li><li>`invalidFenStop` is `true` and the *fen* fails the **refined fen test**.</li></ul>
**fenApply**(<br>*fen*,<br>`"legalMoves"`,<br>[<br>*initial_qos*<br>]<br>) | <ul><li>fen (String)</li><li>`"legalMoves"` (String)</li><li>initial_qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | Success:<ul><li>**finalPosArray** (Array)</li></ul><hr>Error:<ul><li>Array: `[]`</li></ul> | Returns a **final pos array** with all the squares that a **piece** from an **initial qos** can legally move to.<br><br>Passing an **initial qos** square with a **piece val** of `0` or a **non active sign** will result in a `[]`.<hr>Examples:<ul><li>`Ic.fenApply("8/8/8/4k3/8/8/r1R1K3/8 w - - 0 1", "legalMoves", ["c2"]) //[[6, 1], [6, 0], [6, 3]]`<ul><li>:zap:**Tip:** to convert Arrays of **pos** to **bos** use<br>`Ic.mapToBos([...])` or<br>`[...].map(x => Ic.toBos(x))` to get `["b2", "a2", "d2"]`.</li></ul></li><li>`Ic.fenApply("8/8/8/4k3/8/8/r1R1K3/8 w - - 0 1", "legalMoves", ["a2"]) //[]`</li><li>`Ic.fenApply("0invalidfen0", "legalMoves", ["a1"]) //[]`</li></ul>
**fenApply**(<br>*fen*,<br>`"isLegalMove"`,<br>[<br>*initial_qos*,<br>*final_qos*<br>]<br>) | <ul><li>fen (String)</li><li>`"isLegalMove"` (String)</li><li>initial_qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li><li>final_qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | Success:<ul><li>Boolean</li></ul><hr>Error:<ul><li>Boolean: `false`</li></ul> | Test to see if a move from an **initial qos** square to a **final qos** square is valid or not.<hr>Examples:<ul><li>`Ic.fenApply("8/8/8/4k3/8/8/r1R1K3/8 w - - 0 1", "isLegalMove", ["c2", "a2"]) //true`</li><li>`Ic.fenApply("8/8/8/4k3/8/8/r1R1K3/8 w - - 0 1", "isLegalMove", ["a2", "c2"]) //false`</li><li>`Ic.fenApply("0invalidfen0", "isLegalMove", ["a1", "a2"]) //false`</li></ul>
**fenApply**(<br>*fen*,<br>`"isLegalFen"`<br>) | <ul><li>fen (String)</li><li>`"isLegalFen"` (String)</li></ul> | Boolean | Test to see if a **fen** position is legal or not.<hr>Examples:<ul><li>`Ic.fenApply("8/8/8/8/8/1k6/8/1K1r4 w - - 0 1", "isLegalFen") //true`</li><li>`Ic.fenApply("0invalidfen0", "isLegalFen") //false`</li><li>`Ic.fenApply("rnbqkbnr/pppppppp/8/8/8/1P6/1PPPPPPP/RNBQKBNR w KQkq - 0 1", "isLegalFen") //false`</li></ul>
**fenApply**(<br>*fen*,<br>`"getValue"`,<br>[<br>*qos*<br>]<br>) | <ul><li>fen (String)</li><li>`"getValue"` (String)</li><li>qos:<ul><li>**squareBos** (String)</li><li>**squarePos** (Array)</li></ul></li></ul> | Success:<ul><li>**pieceVal** (Number): `-6 to 6`</li></ul><hr>Error:<ul><li>Number: `0`</li></ul> | Returns the **piece val** of a square.<hr>Examples:<ul><li>`Ic.fenApply("4k3/8/3K1R2/8/8/8/8/8 b - - 0 1", "getValue", ["e8"]) //-6`</li><li>`Ic.fenApply("4k3/8/3K1R2/8/8/8/8/8 b - - 0 1", "getValue", [[2, 5]]) //4`</li><li>`Ic.fenApply("0invalidfen0", "getValue", ["d6"]) //0`</li></ul>
**fenApply**(<br>*fen*,<br>`"materialDifference"`<br>) | <ul><li>fen (String)</li><li>`"materialDifference"` (String)</li></ul> | Success:<ul><li>Object</li></ul><hr>Error:<ul><li>Object: `{w:[], b:[]}`</li></ul> | Returns the **material difference**.<hr>Examples:<ul><li>`Ic.fenApply("k7/1r6/8/p6R/Pp6/8/1RR5/K7 b - - 0 1", "materialDifference") //{w:[4, 4], b:[-1]}`</li><li>`Ic.fenApply("8/1rr5/nn4k1/2p1P3/2PP4/B5K1/Q1R5/8 w - - 0 1", "materialDifference") //{w:[1, 1, 3, 5], b:[-2, -2, -4]}`</li><li>`Ic.fenApply("8/kr3pn1/qp4p1/p4b1p/P4B1P/QP4P1/KR3PN1/8 w - - 0 1", "materialDifference") //{w:[], b:[]}`</li><li>`Ic.fenApply("0invalidfen0", "materialDifference") //{w:[], b:[]}`</li></ul>
**getBoardNames**() | - | **boardNamesArray** (Array) | Returns a **board names array**.<br><br>The **board**s with `isHidden = true` are also included.<hr>Examples:<ul><li>`Ic.getBoardNames() //["main", "other", "other_copy", "hidden_board", "resume_from_fen"]`</li><li>`Ic.getBoardNames() //[]`</li></ul>
**mapToBos**(<br>*arr*<br>) | <ul><li>arr:<ul><li>**squareBosArray** (Array)</li><li>**squarePosArray** (Array)</li><li>**squareQosArray** (Array)</li></ul></li></ul> | Success:<ul><li>**squareBosArray** (Array)</li></ul><hr>Error:<ul><li>Array: `[]`</li></ul> | Applies `[...].map(x => Ic.toBos(x))` to an array.<br><br>If `arr` is not an Array, `[]` will be returned.<hr>Examples:<ul><li>`Ic.mapToBos([[0, 7], [2, 2]]) //["h8", "c6"]`</li><li>`Ic.mapToBos([[1, 1], "a2"]) //["b7", "a2"]`</li><li>`Ic.mapToBos("err") //[]`</li></ul>

<hr>

#### List of `board.<Properties>`:

Boards created by `Ic.initBoard()` have the following accessible properties.

Propery | Type | Description
------- | ---- | -----------
**BoardName** | String | All **board**s have a unique **board name** that is set when created. This property can't be modified.<hr>Examples:<ul><li>`main_board.BoardName //"main"`</li><li>`other_board.BoardName //"other"`</li><li>`rff_board.BoardName //"resume_from_fen"`</li></ul>
**Active** | Object | :wrench: ... **under construction** ... :wrench:
**NonActive** | Object | :wrench: ... **under construction** ... :wrench:
**Fen** | String | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`main_board.Fen //"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"`</li><li>`rff_board.Fen //"r5k1/pp3ppp/7n/8/2P2P1K/3P1q2/P1PBb2P/R5QR b - - 3 22"`</li></ul>
**WCastling** | Number | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`w_no_rights_board.WCastling //0`</li><li>`w_kingside_only_board.WCastling //1`</li><li>`w_queenside_only_board.WCastling //2`</li><li>`w_both_rights_board.WCastling //3`</li></ul>
**BCastling** | Number | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`b_no_rights_board.BCastling //0`</li><li>`b_kingside_only_board.BCastling //1`</li><li>`b_queenside_only_board.BCastling //2`</li><li>`b_both_rights_board.BCastling //3`</li></ul>
**EnPassantBos** | String | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board_after_e4.EnPassantBos //"e3"`</li><li>`board_no_enpass.EnPassantBos //""`</li></ul>
**HalfMove** | Number | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board.HalfMove //0`</li><li>`board_after_e4.HalfMove //0`</li><li>`board_after_e4e5.HalfMove //0`</li><li>`board_after_e4_e5_nf3.HalfMove //1`</li><li>`rff_board.HalfMove //3`</li></ul>
**FullMove** | Number | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board.FullMove //1`</li><li>`board_after_e4.FullMove //1`</li><li>`board_after_e4_e5.FullMove //2`</li><li>`board_after_e4_e5_nf3.FullMove //2`</li><li>`rff_board.FullMove //22`</li></ul>
**InitialFullMove** | Number | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`main_board.InitialFullMove //1`</li><li>`rff_board.InitialFullMove //22`</li></ul>
**MoveList** | Object | :wrench: ... **under construction** ... :wrench:
**CurrentMove** | Number | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board.CurrentMove //0`</li><li>`board_after_e4.CurrentMove //1`</li><li>`board_after_e4e5.CurrentMove //2`</li><li>`board_after_e4_e5_nf3.CurrentMove //3`</li><li>`rff_board.CurrentMove //0`</li></ul>
**IsRotated** | Boolean | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board.IsRotated //false`</li><li>`board_currently_rotated.IsRotated //true`</li></ul>
**IsCheck** | Boolean | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board_in_check.IsCheck //true`</li><li>`board_in_checkmate.IsCheck //true`</li><li>`board_in_stalemate.IsCheck //false`</li><li>`board_not_in_check.IsCheck //false`</li></ul>
**IsCheckmate** | Boolean | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board_in_check.IsCheckmate //false`</li><li>`board_in_checkmate.IsCheckmate //true`</li><li>`board_in_stalemate.IsCheckmate //false`</li><li>`board_not_in_check.IsCheckmate //false`</li></ul>
**IsStalemate** | Boolean | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board_in_check.IsStalemate //false`</li><li>`board_in_checkmate.IsStalemate //false`</li><li>`board_in_stalemate.IsStalemate //true`</li><li>`board_not_in_check.IsStalemate //false`</li></ul>
**MaterialDiff** | Object | :wrench: ... **under construction** ... :wrench:
**PromoteTo** | Number | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board_q_option.PromoteTo //5`</li><li>`board_r_option.PromoteTo //4`</li><li>`board_b_option.PromoteTo //3`</li><li>`board_n_option.PromoteTo //2`</li></ul>
**FromSquare** | String | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`board_e2_selected_in_ui.FromSquare //"e2"`</li><li>`board_after_e4.FromSquare //""`</li></ul>
**IsHidden** | Boolean | :wrench: ... **under construction** ... :wrench:<hr>Examples:<ul><li>`main_board.IsHidden //false`</li><li>`h_board.IsHidden //true`</li></ul>
**Squares** | Object | :wrench: ... **under construction** ... :wrench:

<hr>

#### List of `board.<methods>(...)`:

Boards created by `Ic.initBoard()` have the following available methods.

Function | Parameters | Return | Description
-------- | ---------- | ------ | -----------
getValue(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
setValue(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
materialDifference(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
calculateChecks(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
toggleIsRotated(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
setPromoteTo(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
setCurrentMove(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
readFen(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
updateKingsChecksFenMatdiff(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
refinedFenTest(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
testCollision(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
isLegalMove(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
legalMoves(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
ascii(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
boardHash(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
isEqualBoard(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
cloneBoardFrom(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
cloneBoardTo(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
moveCaller(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:
refreshBoard(...) | :wrench: | :wrench: | :wrench: ... **under construction** ... :wrench:

To Do
-------------

- Documentation (:wrench: 70% done)
- Draws by threefold repetition, 50-move rule, insufficient material
- PGN parser
- Nested move list variations

Copyright and License
-------------

Copyright © 2020 Ajax Isepic (ajax333221)

Licensed under MIT License: http://opensource.org/licenses/mit-license.php
