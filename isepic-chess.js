/** Copyright (c) 2012 Ajax Isepic (ajax333221) Licensed MIT *//*jshint indent:4, quotmark:double, onevar:true, undef:true, unused:true, trailing:true, jquery:true, curly:true, es3:true, latedef:nofunc, bitwise:false, sub:true */function strContains(str, str_to_find){	return (str.indexOf(str_to_find)!=-1);}function countChars(str, char_list_to_count){	return (str.length-(str.replace(RegExp(char_list_to_count, "g"), "")).length);}function bosToPos(bos){	return [(8-(bos.charAt(1)*1)), "abcdefgh".indexOf(bos.charAt(0))];}function posToBos(pos){	return ("abcdefgh".charAt(pos[1])+""+(8-pos[0]));}function toBos(qos){	if(typeof qos!=="string"){//is array pos		qos=posToBos(qos);	}		return qos;}function insideBoard(pos){	return ((pos[0]<=7 && pos[0]>=0) && (pos[1]<=7 && pos[1]>=0));}function isLegalMove(initial_pos, final_pos, obj){	return (insideBoard(initial_pos) && insideBoard(final_pos) && strContains(legalMoves(initial_pos, obj).join(""), final_pos.join()));}function sameSqr(qos1, qos2){	return (toBos(qos1)===toBos(qos2));}function toggleActiveColor(obj){	var temp;		temp=obj.Active.isBlack;		obj.Active.isBlack=!temp;	obj.NonActive.isBlack=temp;	obj.Active.sign=(temp ? 1 : -1);	obj.NonActive.sign=(temp ? -1 : 1);}function toggleIsRotated(obj){	obj.IsRotated=!obj.IsRotated;}function setPromoteTo(abs_val, obj){	obj.PromoteTo=abs_val;}function getPieceChar(val){	return ["*", "p", "n", "b", "r", "q", "k"][Math.abs(val)];}function countChecks(king_pos, early_break, obj){	var i, j, as_knight, rtn_total_checks;		rtn_total_checks=0;		outer:	for(i=0; i<2; i++){//0...1		as_knight=!!i;				for(j=1; j<9; j++){//1...8			if(isAttacked(king_pos, j, as_knight, obj)){				rtn_total_checks++;								if(early_break){					break outer;				}			}		}	}		return rtn_total_checks;}function setCurrentMove(val, is_goto, obj){	var len, temp;		len=obj.MoveList.length;		if(len>1){		temp=Math.min(Math.max((is_goto ? val : val+obj.CurrentMove), 0), (len-1));				if(temp!=obj.CurrentMove){			obj.CurrentMove=temp;						readFen(obj.MoveList[temp].Fen, false, obj);			refreshHTML(obj);		}	}}function appendChessBoardHTML(obj){	$("body").append("<div id='xchessboard'><table id='xboard' cellpadding='0' cellspacing='0'></table><div id='xcontrols'><input id='xfen' value='' type='text'><br><input id='xgoto0' value='|<' type='button'> <input id='xgoto1' value='<' type='button'> <input id='xgoto2' value='>' type='button'> <input id='xgoto3' value='>|' type='button'> | <input id='xrotate' value='rotate' type='button'> | <select id='xpromote'><option value='5' selected='selected'>queen</option><option value='4'>rook</option><option value='3'>bishop</option><option value='2'>knight</option></select><hr><p id='xmovelist'></p></div><p id='xobjinfo'></p></div>");		$("#xfen").click(function(){$(this).select();});	$("#xgoto0").click(function(){setCurrentMove(0, true, obj);});	$("#xgoto1").click(function(){setCurrentMove(-1, false, obj);});	$("#xgoto2").click(function(){setCurrentMove(1, false, obj);});	$("#xgoto3").click(function(){setCurrentMove(10000, true, obj);});		$("#xrotate").click(function(){		toggleIsRotated(obj);		refreshHTML(obj);	});		$("#xpromote").change(function(){		setPromoteTo(($(this).val()*1), obj);		$("#xobjinfo").html(getObjInfoHTML(obj));	});}function getBoardHTML(obj){	var i, j, temp, current_bos, rtn;		rtn="<tbody>";		for(i=0; i<8; i++){//0...7		rtn+="<tr>";				for(j=0; j<8; j++){//0...7			current_bos=posToBos(obj.IsRotated ? [(7-i), (7-j)] : [i, j]);						temp=obj.getValue(current_bos);			temp=(temp ? ((temp<0 ? " b" : " w")+getPieceChar(temp)) : "");						rtn+="<td class='"+((i+j)%2 ? "b" : "w")+"s"+temp+"' id='"+current_bos+"'></td>";		}				rtn+="</tr>";	}		rtn+="</tbody>";		return rtn;}function getMoveListHTML(obj){	var i, len, move_list, black_starts, rtn;		move_list=obj.MoveList;	black_starts=strContains(move_list[0].Fen, " b ");		rtn="";		for(i=1, len=move_list.length; i<len; i++){//1<len		rtn+=(i!=1 ? " " : "")+(black_starts!=(i%2) ? ("<span class='xpgn_number'>"+(obj.InitialFullMove+Math.floor((i+black_starts-1)/2))+".</span>") : "")+"<span id='xpgn"+i+"' class='xpgn_"+(i!=obj.CurrentMove ? "goto" : "active")+"'>"+move_list[i].PGNmove+"</span>";	}		if(black_starts && rtn!=""){		rtn="<span class='xpgn_number'>"+obj.InitialFullMove+"...</span>"+rtn;	}		return rtn;}function getObjInfoHTML(obj){	var castling_holder, rtn;		castling_holder=["", "k", "q", "kq"];		rtn="<strong>board_name:</strong> "+obj.BoardName;	rtn+="<br><strong>board_is_rotated:</strong> "+obj.IsRotated;	rtn+="<br><strong>en_passant:</strong> "+(obj.EnPassantBos ? obj.EnPassantBos : "-");	rtn+="<br><strong>active_color:</strong> "+(obj.Active.isBlack ? "black" : "white");	rtn+="<br><strong>active_king_checks:</strong> "+obj.Active.checks;	rtn+="<br><strong>active_king_pos:</strong> "+posToBos(obj.Active.kingPos);	rtn+="<br><strong>non_active_king_pos:</strong> "+posToBos(obj.NonActive.kingPos);	rtn+="<br><strong>white_castling:</strong> "+(castling_holder[obj.WCastling].toUpperCase() || "-");	rtn+="<br><strong>black_castling:</strong> "+(castling_holder[obj.BCastling] || "-");	rtn+="<br><strong>half_moves:</strong> "+obj.HalfMove;	rtn+="<br><strong>full_moves:</strong> "+obj.FullMove;	rtn+="<br><strong>current_move:</strong> "+obj.CurrentMove;	rtn+="<br><strong>initial_fullmove:</strong> "+obj.InitialFullMove;	rtn+="<br><strong>promote_to:</strong> "+(obj.Active.isBlack ? getPieceChar(obj.PromoteTo) : getPieceChar(obj.PromoteTo).toUpperCase());	rtn+="<br><strong>from_square:</strong> "+(obj.FromSquare ? obj.FromSquare : "-");		return rtn;}function refreshHTML(obj){	if(!obj.IsHidden){		if(!$("#xchessboard").length){			appendChessBoardHTML(obj);		}				$("#xboard").html(getBoardHTML(obj));		$("#xmovelist").html(getMoveListHTML(obj));		$("#xfen").val(obj.Fen);				$(".xpgn_goto").click(function(){setCurrentMove((this.id.substring(4)*1), true, obj);});				if(obj.CurrentMove!=0){			$("#"+obj.MoveList[obj.CurrentMove].FromBos).addClass("lastmove");			$("#"+obj.MoveList[obj.CurrentMove].ToBos).addClass("lastmove");		}				giveSquareMovement(obj);				$("#xobjinfo").html(getObjInfoHTML(obj));	}}function initBoard(board_name, fen, rotate_board, is_hidden){	var i, j, new_board;		new_board=window[board_name]={		getValue : function(qos){			return this[toBos(qos)];		},		BoardName : board_name,		Active : {			isBlack : null,			sign : null,			kingPos : null,			checks : null		},		NonActive : {			isBlack : null,			sign : null,			kingPos : null			//checks		},		Fen : null,		WCastling : null,		BCastling : null,		EnPassantBos : null,		HalfMove : null,		FullMove : null,		InitialFullMove : null,		MoveList : null,		CurrentMove : null,		IsRotated : null,		PromoteTo : null,		FromSquare : null,		IsHidden : null	};		for(i=0; i<8; i++){		for(j=0; j<8; j++){			new_board[posToBos([i, j])]=null;		}	}		readFen(fen, true, new_board);		new_board.IsHidden=!!is_hidden;		if(rotate_board){		toggleIsRotated(new_board);	}		refreshHTML(new_board);		return new_board;}function deleteBoard(obj){	window[obj.BoardName]=null;}function cloneBoard(obj){	var i, j, temp, board_name, rtn;		board_name=(obj.BoardName+"_copy");		rtn=window[board_name]={		getValue : function(qos){			return this[toBos(qos)];		},		BoardName : board_name,		Active : JSON.parse(JSON.stringify(obj.Active)),		NonActive : JSON.parse(JSON.stringify(obj.NonActive)),		Fen : obj.Fen,		WCastling : obj.WCastling,		BCastling : obj.BCastling,		EnPassantBos : obj.EnPassantBos,		HalfMove : obj.HalfMove,		FullMove : obj.FullMove,		InitialFullMove : obj.InitialFullMove,		MoveList : JSON.parse(JSON.stringify(obj.MoveList)),		CurrentMove : obj.CurrentMove,		IsRotated : obj.IsRotated,		PromoteTo : obj.PromoteTo,		FromSquare : obj.FromSquare,		IsHidden : obj.IsHidden	};		for(i=0; i<8; i++){		for(j=0; j<8; j++){			temp=posToBos([i, j]);						rtn[temp]=obj[temp];		}	}		return rtn;}function parseValuesFromFEN(fenb, obj){	var i, j, len, temp, current_file, skip_files, piece_char;		for(i=0; i<8; i++){		for(j=0; j<8; j++){			obj[posToBos([i, j])]=0;		}	}		fenb=fenb.split("/");		for(i=0; i<8; i++){//0...7		current_file=0;				for(j=0, len=fenb[i].length; j<len; j++){//0<len			temp=fenb[i].charAt(j);			skip_files=(temp*1);						if(!skip_files){				piece_char=temp.toLowerCase();				obj[toBos([i, current_file])]="*pnbrqk".indexOf(piece_char)*(temp==piece_char ? -1 : 1);			}						current_file+=(skip_files || 1);		}	}}function readFen(fen, is_creating, obj){	var temp, fen_parts;		if(is_creating){		if(typeof fen!=="string"){			fen="";		}				fen=fen.replace(/^\s+|\s+$/g, "").replace(/\s\s+/g, " ");		fen=(preFenValidation(fen) ? fen : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");	}		fen_parts=fen.split(" ");		parseValuesFromFEN(fen_parts[0], obj);		temp=(fen_parts[1]=="b");	obj.Active.isBlack=temp;	obj.NonActive.isBlack=!temp;	obj.Active.sign=(temp ? -1 : 1);	obj.NonActive.sign=(temp ? 1 : -1);		obj.WCastling=(strContains(fen_parts[2], "K") ? 1 : 0)+(strContains(fen_parts[2], "Q") ? 2 : 0);	obj.BCastling=(strContains(fen_parts[2], "k") ? 1 : 0)+(strContains(fen_parts[2], "q") ? 2 : 0);		obj.EnPassantBos=fen_parts[3].replace("-", "");		obj.HalfMove=(fen_parts[4]*1) || 0;	obj.FullMove=(fen_parts[5]*1) || 1;		refreshKingPosChecksAndFen(obj);		if(is_creating){		obj.InitialFullMove=obj.FullMove;		obj.MoveList=[{Fen : fen, PGNmove : "", FromBos : "", ToBos : ""}];		obj.CurrentMove=0;		obj.IsRotated=false;		obj.PromoteTo=5;				if(!postFenValidation(obj)){			readFen(null, true, obj);		}	}}function refreshKingPosChecksAndFen(obj){	var i, j, piece_char, current_pos, current_val, empty_consecutive_squares, new_fen_board, current_is_black, castling_holder;		new_fen_board="";		for(i=0; i<8; i++){//0...7		empty_consecutive_squares=0;				for(j=0; j<8; j++){//0...7			current_pos=[i, j];			current_val=obj.getValue(current_pos);						if(current_val){				current_is_black=(current_val<0);								if((current_is_black ? -current_val : current_val)==6){					if(obj.Active.isBlack==current_is_black){						obj.Active.kingPos=current_pos;					}else{						obj.NonActive.kingPos=current_pos;					}				}								piece_char=getPieceChar(current_val);				new_fen_board+=(empty_consecutive_squares || "")+(current_is_black ? piece_char : piece_char.toUpperCase());								empty_consecutive_squares=-1;			}						empty_consecutive_squares++;		}				new_fen_board+=(empty_consecutive_squares || "")+(i!=7 ? "/" : "");	}		obj.Active.checks=countChecks(obj.Active.kingPos, false, obj);		castling_holder=["", "k", "q", "kq"];	obj.Fen=(new_fen_board+" "+(obj.Active.isBlack ? "b" : "w")+" "+((castling_holder[obj.WCastling].toUpperCase()+""+castling_holder[obj.BCastling]) || "-")+" "+(obj.EnPassantBos || "-")+" "+obj.HalfMove+" "+obj.FullMove);}function preFenValidation(fen){	var i, j, len, temp, optional_clocks, last_is_num, current_is_num, fen_board_arr, piece_char, total_pieces, fen_board, total_files_in_current_row, keep_going, rtn_is_legal;		rtn_is_legal=false;		if(fen){		optional_clocks=fen.replace(/^([rnbqkRNBQK1-8]+\/)([rnbqkpRNBQKP1-8]+\/){6}([rnbqkRNBQK1-8]+)\s[bw]\s(-|K?Q?k?q?)\s(-|[a-h][36])($|\s)/, "");		keep_going=(fen.length!=optional_clocks.length);				if(keep_going){			if(optional_clocks.length){				keep_going=(/^(0|[1-9][0-9]*)\s([1-9][0-9]*)$/.test(optional_clocks));			}						if(keep_going){				fen_board=fen.split(" ")[0];				fen_board_arr=fen_board.split("/");								outer:				for(i=0; i<8; i++){//0...7					total_files_in_current_row=0;					last_is_num=false;										for(j=0, len=fen_board_arr[i].length; j<len; j++){//0<len						temp=(fen_board_arr[i].charAt(j)*1);						current_is_num=!!temp;												if(last_is_num && current_is_num){							keep_going=false;							break outer;						}												last_is_num=current_is_num;												total_files_in_current_row+=(temp || 1);					}										if(total_files_in_current_row!=8){						keep_going=false;						break;					}				}								if(keep_going){					for(i=0; i<2; i++){//0...1						total_pieces=new Array(6);												for(j=0; j<6; j++){//0...5							piece_char=getPieceChar(j+1);							total_pieces[j]=countChars(fen_board, (i ? piece_char.toUpperCase() : piece_char));						}												if((total_pieces[5]!=1) || (total_pieces[0]>8) || ((Math.max(total_pieces[1]-2, 0)+Math.max(total_pieces[2]-2, 0)+Math.max(total_pieces[3]-2, 0)+Math.max(total_pieces[4]-1, 0))>(8-total_pieces[0]))){							keep_going=false;							break;						}					}										rtn_is_legal=keep_going;				}			}		}	}		return rtn_is_legal;}function postFenValidation(obj){	var i, j, k, temp, temp2, current_sign, keep_going, en_passant_pos, current_castling_availity, current_king_rank, en_passant_rank, en_passant_file, fen_board, total_pawns_in_current_file, min_captured, min_captured_holder, rtn_is_legal;		rtn_is_legal=false;		if((obj.HalfMove-obj.Active.isBlack+1)<(obj.FullMove*2)){		if(obj.Active.checks<3){			toggleActiveColor(obj);			keep_going=!countChecks(obj.NonActive.kingPos, true, obj);			toggleActiveColor(obj);						if(keep_going){				if(obj.EnPassantBos){					temp=obj.NonActive.sign;//(obj.Active.isBlack ? 1 : -1)					en_passant_pos=bosToPos(obj.EnPassantBos);										en_passant_rank=en_passant_pos[0];					en_passant_file=en_passant_pos[1];										/*negar todo permite salvar?*/					keep_going=(!obj.HalfMove && !obj.getValue(en_passant_pos) && en_passant_rank==(obj.Active.isBlack ? 5 : 2) && !obj.getValue([(en_passant_rank+temp), en_passant_file]) && obj.getValue([(en_passant_rank-temp), en_passant_file])==temp);				}								if(keep_going){					fen_board=obj.Fen.split(" ")[0];										for(i=0; i<2; i++){//0...1						min_captured=0;												for(j=0; j<8; j++){//0...7							min_captured_holder=(j==0 || j==7) ? [1, 3, 6, 10, 99] : [1, 2, 4, 6, 9];							temp2="";														for(k=0; k<8; k++){//0...7								temp2+="#"+(obj.getValue([k, j]) || "");							}														total_pawns_in_current_file=(countChars(temp2, (i ? "#-1" : "#1"))/(i ? 3 : 2));														if(total_pawns_in_current_file>1){								min_captured+=min_captured_holder[total_pawns_in_current_file-2];							}						}												if(min_captured>(15-countChars(fen_board, (i ? "P|N|B|R|Q" : "p|n|b|r|q")))){							keep_going=false;							break;						}					}										if(keep_going){						for(i=0; i<2; i++){//0...1							current_castling_availity=(i ? obj.WCastling : obj.BCastling);														if(current_castling_availity){								current_sign=(i ? 1 : -1);								current_king_rank=(i ? 7 : 0);																if(obj.getValue([current_king_rank, 4])!=(current_sign*6)){									keep_going=false;								}else if(current_castling_availity!=2 && obj.getValue([current_king_rank, 7])!=(current_sign*4)){									keep_going=false;								}else if(current_castling_availity!=1 && obj.getValue([current_king_rank, 0])!=(current_sign*4)){									keep_going=false;								}							}														if(!keep_going){								break;							}						}												rtn_is_legal=keep_going;					}				}			}		}	}		return rtn_is_legal;}function candidateMoves(initial_pos, piece_direction, as_knight, total_squares, allow_capture, obj){	return testCollision(1, initial_pos, piece_direction, as_knight, total_squares, allow_capture, obj);}function isAttacked(initial_pos, piece_direction, as_knight, obj){	return testCollision(2, initial_pos, piece_direction, as_knight, null, null, obj);}function disambiguationPos(initial_pos, piece_direction, as_knight, ally_abs_val, obj){	return testCollision(3, initial_pos, piece_direction, as_knight, null, ally_abs_val, obj);}function testCollision(op, initial_pos, piece_direction, as_knight, total_squares, CHAN, obj){	var i, move_by, current_rank, current_file, current_pos, current_val, impossible_to_name, movement_holder, rtn;		movement_holder=(as_knight ? [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1]] : [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]);		total_squares=(as_knight ? 1 : (total_squares || 7));/*NO use math max 7, even if 999 the loop breaks on outside board*/	move_by=movement_holder[piece_direction-1];		current_rank=initial_pos[0];	current_file=initial_pos[1];		rtn=(op==2 ? false : []);		for(i=0; i<total_squares; i++){//0<total_squares		current_rank+=move_by[0];		current_file+=move_by[1];		current_pos=[current_rank, current_file];				if(!insideBoard(current_pos)){			break;		}				current_val=obj.getValue(current_pos);				if(current_val){			impossible_to_name=current_val*obj.NonActive.sign;//(obj.Active.isBlack ? current_val : -current_val)						if(impossible_to_name>0){				if(op==1){					if(CHAN && impossible_to_name!=6){						rtn.push(current_pos);					}				}else if(op==2){					if(as_knight){						if(impossible_to_name==2){//knight							rtn=true;						}					}else if(impossible_to_name==6){//king						if(!i){							rtn=true;						}					}else if(impossible_to_name==5){//queen						rtn=true;					}else if(piece_direction%2){						if(impossible_to_name==4){//rook							rtn=true;						}					}else if(impossible_to_name==3){//bishop						rtn=true;					}else if(!i && impossible_to_name==1){						if(current_val!=-1){//w_pawn							if(piece_direction==4 || piece_direction==6){								rtn=true;							}						}else{//b_pawn							/*NO merge in a single else if, the minimizer will do this*/							if(piece_direction==2 || piece_direction==8){								rtn=true;							}						}					}				}			}else if(op==3){				if(CHAN==-impossible_to_name){					rtn=current_pos;				}			}						break;		}				if(op==1){			rtn.push(current_pos);/*NO move this up (por lo del break)*/		}	}		return rtn;}function legalMoves(piece_pos, obj){	var i, j, len, len2, temp, temp2, temp_board, active_color, non_active_sign, current_adjacent_file, piece_val, impossible_to_name, current_pos, current_diagonal_pawn_pos, pre_validated_arr_pos, can_castle_current_side, active_color_king_rank, is_king, as_knight, en_passant_capturable_bos, piece_rank, active_castling_availity, rtn_validated_arr_pos;		rtn_validated_arr_pos=[];		if(insideBoard(piece_pos)){		temp_board=cloneBoard(obj);		temp_board.IsHidden=true;				active_color=temp_board.Active.isBlack;		non_active_sign=temp_board.NonActive.sign;				piece_val=temp_board.getValue(piece_pos);		impossible_to_name=(piece_val*-non_active_sign);				if(impossible_to_name>0){			pre_validated_arr_pos=[];						en_passant_capturable_bos="";						is_king=(impossible_to_name==6);			active_color_king_rank=(active_color ? 0 : 7);						if(is_king){//king				for(i=1; i<9; i++){//1...8					if((temp=candidateMoves(piece_pos, i, false, 1, true, temp_board)).length){pre_validated_arr_pos.push(temp);}				}								active_castling_availity=(active_color ? temp_board.BCastling : temp_board.WCastling);								if(active_castling_availity && !temp_board.Active.checks){					for(i=0; i<2; i++){//0...1						if(active_castling_availity!=(i ? 1 : 2)){							if(candidateMoves(piece_pos, (i ? 7 : 3), false, (i ? 3 : 2), false, temp_board).length==(i ? 3 : 2)){								can_castle_current_side=true;																for(j=0; j<2; j++){//0...1									if(countChecks([active_color_king_rank, (j+(i ? 2 : 5))], true, temp_board)){//5...6 or 2...3										can_castle_current_side=false;										break;									}								}																if(can_castle_current_side){									pre_validated_arr_pos.push([[active_color_king_rank, (i ? 2 : 6)]]);								}							}						}					}				}			}else if(impossible_to_name==1){//pawn				piece_rank=piece_pos[0];								if((temp=candidateMoves(piece_pos, (active_color ? 5 : 1), false, (piece_rank==(active_color_king_rank+non_active_sign) ? 2 : 1), false, temp_board)).length){pre_validated_arr_pos.push(temp);}								for(i=0; i<2; i++){//0...1					current_adjacent_file=(piece_pos[1]+(i ? 1 : -1));					current_diagonal_pawn_pos=[(piece_rank+non_active_sign), current_adjacent_file];										if(insideBoard(current_diagonal_pawn_pos)){						temp2=(temp_board.getValue(current_diagonal_pawn_pos)*non_active_sign);												/*NO use (x && ...), we have negative numbers too*/						if(temp2>0 && temp2!=6){							pre_validated_arr_pos.push([current_diagonal_pawn_pos]);						}else if(sameSqr(current_diagonal_pawn_pos, temp_board.EnPassantBos)){							en_passant_capturable_bos=posToBos([piece_rank, current_adjacent_file]);							pre_validated_arr_pos.push([current_diagonal_pawn_pos]);						}					}				}			}else{//knight, bishop, rook, queen				as_knight=(impossible_to_name==2);								for(i=0; i<2; i++){//0...1					for(j=(impossible_to_name-3-i ? 8 : 0)+i; --j>0; ){//(x!=4): 8,6,4,2 (x!=3): 7,5,3,1 (else): 8,6,4,2,7,5,3,1						if((temp=candidateMoves(piece_pos, j--, as_knight, null, true, temp_board)).length){pre_validated_arr_pos.push(temp);}					}				}			}						for(i=0, len=pre_validated_arr_pos.length; i<len; i++){//0<len				for(j=0, len2=pre_validated_arr_pos[i].length; j<len2; j++){//0<len2					temp_board=cloneBoard(obj);					temp_board.IsHidden=true;										current_pos=pre_validated_arr_pos[i][j];										temp_board[toBos(piece_pos)]=0;					temp_board[toBos(current_pos)]=piece_val;										if(en_passant_capturable_bos && sameSqr(current_pos, temp_board.EnPassantBos)){						temp_board[en_passant_capturable_bos]=0;					}										if(!countChecks((is_king ? current_pos : temp_board.Active.kingPos), true, temp_board)){						rtn_validated_arr_pos.push(current_pos);					}				}			}		}				deleteBoard(temp_board);	}		return rtn_validated_arr_pos;}function moveCaller(initial_pos, final_pos, obj){	var rtn_can_move;		rtn_can_move=isLegalMove(initial_pos, final_pos, obj);		if(rtn_can_move){		makeMove(initial_pos, final_pos, obj);		refreshHTML(obj);	}		return rtn_can_move;}function makeMove(initial_pos, final_pos, obj){	var active_color, active_sign, active_color_king_rank, pawn_moved, promoted_val, piece_val, piece_abs_val, initial_bos, final_bos, active_color_rook, new_en_passant_bos, new_active_castling_availity, new_non_active_castling_availity, king_castled, non_en_passant_capture, to_promotion_rank, pgn_move;		initial_bos=posToBos(initial_pos);	final_bos=posToBos(final_pos);		active_color=obj.Active.isBlack;	active_sign=obj.Active.sign;	active_color_rook=(active_sign*4);		pawn_moved=false;	new_en_passant_bos="";	promoted_val=0;	king_castled=0;	non_en_passant_capture=obj.getValue(final_pos);		new_active_castling_availity=(active_color ? obj.BCastling : obj.WCastling);	new_non_active_castling_availity=(active_color ? obj.WCastling : obj.BCastling);		to_promotion_rank=(final_pos[0]==(active_color ? 7 : 0));	active_color_king_rank=(active_color ? 0 : 7);		piece_val=obj.getValue(initial_pos);	piece_abs_val=(piece_val*active_sign);//same as Math.abs(piece_val)		if(piece_abs_val==6){//king		if(new_active_castling_availity){/*NO useless if(Math.abs(initial_pos[1]-final_pos[1])>1)*/			new_active_castling_availity=0;						if(final_pos[1]==6){//short				king_castled=1;								obj[toBos([active_color_king_rank, 5])]=active_color_rook;				obj[toBos([active_color_king_rank, 7])]=0;			}else if(final_pos[1]==2){//long				king_castled=2;								obj[toBos([active_color_king_rank, 3])]=active_color_rook;				obj[toBos([active_color_king_rank, 0])]=0;			}		}	}else if(piece_abs_val==1){//pawn		pawn_moved=true;				if(Math.abs(initial_pos[0]-final_pos[0])>1){//new enpass			new_en_passant_bos=(final_bos.charAt(0)+""+(active_color ? 6 : 3));		}else if(sameSqr(final_bos, obj.EnPassantBos)){//pawn x enpass			obj[toBos(final_bos.charAt(0)+""+(active_color ? 4 : 5))]=0;		}else if(to_promotion_rank){//promotion			promoted_val=(obj.PromoteTo*active_sign);		}	}		pgn_move=getNotation(initial_bos, final_bos, piece_abs_val, promoted_val, king_castled, non_en_passant_capture, obj);/*NO move below*/		obj.HalfMove++;	if(pawn_moved || non_en_passant_capture){		obj.HalfMove=0;	}		if(active_color){		obj.FullMove++;	}		if(piece_abs_val==4 && initial_pos[0]==active_color_king_rank){		if(new_active_castling_availity){			if(initial_pos[1]==7 && new_active_castling_availity!=2){//short				new_active_castling_availity--;			}else if(initial_pos[1]==0 && new_active_castling_availity!=1){//long				new_active_castling_availity-=2;			}		}	}		if(non_en_passant_capture==-active_color_rook && to_promotion_rank){		if(new_non_active_castling_availity){			if(final_pos[1]==7 && new_non_active_castling_availity!=2){//short				new_non_active_castling_availity--;			}else if(final_pos[1]==0 && new_non_active_castling_availity!=1){//long				new_non_active_castling_availity-=2;			}		}	}		obj.WCastling=(active_color ? new_non_active_castling_availity : new_active_castling_availity);	obj.BCastling=(active_color ? new_active_castling_availity : new_non_active_castling_availity);		obj.EnPassantBos=new_en_passant_bos;/*NO move this up*/		obj[toBos(final_pos)]=(promoted_val || piece_val);	obj[toBos(initial_pos)]=0;		toggleActiveColor(obj);		refreshKingPosChecksAndFen(obj);		obj.CurrentMove++;		if(obj.CurrentMove!=obj.MoveList.length){		obj.MoveList=obj.MoveList.slice(0, obj.CurrentMove);/*or start a variation?*/	}		obj.MoveList.push({Fen : obj.Fen, PGNmove : (pgn_move+(obj.Active.checks ? "+" : "")), FromBos : initial_bos, ToBos : final_bos});/*# with checkmate*/}function getNotation(initial_bos, final_bos, piece_abs_val, promoted_val, king_castled, non_en_passant_capture, obj){	var i, j, len, temp, temp2, temp3, initial_file_char, final_pos, ambiguity, as_knight, rtn;		rtn="";	initial_file_char=initial_bos.charAt(0);		if(king_castled){//castling king		rtn+=(king_castled!=1 ? "O-O-O" : "O-O");	}else if(piece_abs_val==1){//pawn		if(initial_file_char!=final_bos.charAt(0)){			rtn+=(initial_file_char+"x");		}				rtn+=final_bos;				if(promoted_val){			rtn+=("="+getPieceChar(promoted_val).toUpperCase());		}	}else{//knight, bishop, rook, queen, non-castling king		rtn+=getPieceChar(piece_abs_val).toUpperCase();				if(piece_abs_val!=6){//knight, bishop, rook, queen			temp2=[];			final_pos=bosToPos(final_bos);			as_knight=(piece_abs_val==2);						for(i=0; i<2; i++){//0...1				for(j=(piece_abs_val-3-i ? 8 : 0)+i; --j>0; ){//(x!=4): 8,6,4,2 (x!=3): 7,5,3,1 (else): 8,6,4,2,7,5,3,1					if((temp=disambiguationPos(final_pos, j--, as_knight, piece_abs_val, obj)).length){temp2.push(temp);}				}			}						len=temp2.length;			if(len>1){				temp3="";								for(i=0; i<len; i++){//0<len					if(!sameSqr(temp2[i], initial_bos) && isLegalMove(temp2[i], final_pos, obj)){						temp3+=posToBos(temp2[i]);					}				}								if(temp3){					ambiguity=(strContains(temp3, initial_file_char)+(strContains(temp3, initial_bos.charAt(1))*2));										if(ambiguity!=1){//0,2,3						rtn+=initial_file_char;					}										if(ambiguity && ambiguity!=2){//1,3						rtn+=initial_bos.charAt(1);					}				}			}		}				if(non_en_passant_capture){			rtn+="x";		}				rtn+=final_bos;	}		return rtn;}function giveSquareMovement(obj){	obj.FromSquare="";		$(".ws, .bs").click(function(){		var i, len, temp, legal_moves;				if(!obj.IsHidden){			if(obj.FromSquare){				$(".ws, .bs").unbind("click");				$(".highlight").removeClass("highlight");								temp=obj.FromSquare;				obj.FromSquare="";								if(!moveCaller(bosToPos(temp), bosToPos(this.id), obj)){					giveSquareMovement(obj);				}			}else{				legal_moves=legalMoves(bosToPos(this.id), obj);				len=legal_moves.length;								if(len){					obj.FromSquare=this.id;					$(this).addClass("highlight");										for(i=0; i<len; i++){//0<len						$("#"+posToBos(legal_moves[i])).addClass("highlight");					}				}			}						$("#xobjinfo").html(getObjInfoHTML(obj));		}	});}