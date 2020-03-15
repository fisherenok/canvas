Задача написать простую программу для рисования, исполняющую последовательность команд из файла Input.txt и выдающую output.txt. Используйте следующие команды:  
    
    C w h
    L x1 y1 x2 y2
    R x1 y1 x2 y2
    B x y c

    Canvas: создать canvas шириной w и высотой h.
    Line: проложить линию от (x1,y1) до (x2,y2), используя для рисования псевдографический символ “x”. Поддерживаются только горизонтальные и вертикальные линии.
    Rectangle: создать прямоугольник с верхним левым углом в точке (x1,y1), нижним правым углом в точке (x2,y2). Вертикальные и горизонтальные линии должны быть отрисованы псевдографическими символами “x”.
    Bucket Fill​: залить всю область (x,y) цветом ("colour", c), аналогично тому, как работает инструмент “Заливка” в графических редакторах
Важно: рисовать можно только при условии, что создан canvas!
    Запуск приложения "node canvas.js input.txt", важно чтобы файл input.txt был в катологе с JS файлом.