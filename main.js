const board = new Map([
    [0, 'wR'], [1, 'wN'], [2, 'wB'], [3, 'wQ'], [4, 'wK'], [5, 'wB'], [6, 'wN'], [7, 'wR'],
    [56, 'bR'], [63, 'bR'], [57, 'bN'], [62, 'bN'], [58, 'bB'], [61, 'bB'], [59, 'bQ'], [60, 'bK']
]);

for (let i = 8; i < 16; i++) board.set(i, 'wP');
for (let i = 48; i < 56; i++) board.set(i, 'bP');

const pieces = ['wR', 'wN', 'wB', 'wQ', 'wK', 'wP', 'bR', 'bN', 'bB', 'bQ', 'bK', 'bP'];

let dragging = false;
let draggingPieceSquare = -1;
let mouse_x, mouse_y;

(() => {
    const canvas = document.getElementById("board");
    if(canvas == null) {return;}
    const context = canvas.getContext("2d");
    if(context == null) {return;}
    const width = canvas.width;
    const height = canvas.height;
    const square_side = Math.min(width,height) / 8;
    const piece_images = new Map();
    let pieces_to_load = pieces.length;
    pieces.forEach(val => {
        const piece_image = new Image();
        piece_image.src = `./img/chesspieces/wikipedia/${val}.png`;
        piece_image.alt = val;
        piece_image.onload = () => {    
            piece_images.set(val, piece_image);
            pieces_to_load -= 1;
            if(pieces_to_load == 0) {
                draw_board();
                draw_pieces();
            }
        }
    });
    const square_from_coords = (x, y) => {
        return Math.floor(x / square_side) + 56 - Math.floor(y / square_side) * 8;
    };
    addEventListener("mousedown", (event) => {
        const square = square_from_coords(event.x, event.y);
        const piece = board.get(square);
        if(!piece) return;
        dragging = true;
        draggingPieceSquare = square;
        mouse_x = event.x;
        mouse_y = event.y;
    });
    addEventListener("mousemove", (event) => {
        if(!dragging) return;
        mouse_x = event.x;
        mouse_y = event.y;
        draw_board();
        draw_pieces();
    })
    addEventListener("mouseup", (event) => {
        dragging = false;
        const new_square = square_from_coords(event.x, event.y);
        if(board.get(new_square) === undefined) { 
            board.set(new_square, board.get(draggingPieceSquare));
            board.delete(draggingPieceSquare);
        }
        draggingPieceSquare = -1;
        console.log(board)
    })
    const square_coords = (square) => {
        return {x: (square % 8) * square_side, y: (Math.floor((63 - square) / 8)) * square_side}
    }

    const draw_board = () => {
        for(let i = 0; i < 64; i++) {
            context.fillStyle = ((i + (Math.floor(i / 8) % 2 == 0 ? 0 : 1)) % 2 == 0) ? "gold" : "blue";
            context.fillRect((i % 8) * square_side,Math.floor((i / 8)) * square_side, square_side, square_side);
        }
    }
    const draw_pieces = () => {
        board.entries().forEach(pair => {
            const [square, piece] = pair;
            
            if(dragging && draggingPieceSquare == square) {
                return;
            }
            const image = piece_images.get(piece);
            const coords = square_coords(square);
            context.drawImage(image, coords.x, coords.y);
        });
        if( dragging ) {
            if (board.get(draggingPieceSquare) === undefined) {
                console.log(`undefined: ${draggingPieceSquare}`)
            }
            const image = piece_images.get(board.get(draggingPieceSquare));
            context.drawImage(image, mouse_x - image.width*0.5, mouse_y - image.height*0.5);
        }
    }
    
})();