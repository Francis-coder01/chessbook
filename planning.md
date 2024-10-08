# Planning my chessbook 

## features:

### high level
+ display pretty board
+ pieces have smooth animations and legal moves only
+ flip board
+ save user inputed moves as variations
+ save variations as a repertoire
+ replay variations of a repertoire 
+ import repertoire pgn format

### first iteration:
+ display pretty board
    - grid? pure js? pure css?
        - canvas seems like a go to
    + display chess pieces
        - track their squares
        - draw images of them
        - check has a special king image
+ pieces have smooth animations and legal moves only
    - implement move logic
    - dragging works (check where dropping)
