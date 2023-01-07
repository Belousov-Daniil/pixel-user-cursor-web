# Pixel-CursorPointer_optimized
Optimized custom cursor for WEB-Apps with two states.

Requires RDMTSTUDIOS/[2D Sprite](https://github.com/RDMTSTUDIOS/2D-Sprite-renderer).


### Initiate new cursor
```ts
const cursor = new MousePointer();
```

### Mount cursor to DOM
*Cursor mounts to document.body. Z-Index equals 1000.*
```ts
cursor.Display();
```

### Remove/hide cursor
*Removes element from document.*
```ts
cursor.Hide();
```
