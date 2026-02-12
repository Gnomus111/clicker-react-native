const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Behaviors.scrollto,
		C3.Behaviors.EightDir,
		C3.Plugins.TiledBg,
		C3.Plugins.Tilemap,
		C3.Behaviors.solid,
		C3.Behaviors.Pin,
		C3.Behaviors.Bullet,
		C3.Behaviors.destroy,
		C3.Plugins.Mouse,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.Behaviors.Pin.Acts.PinByProperties,
		C3.Plugins.Mouse.Cnds.OnClick,
		C3.Plugins.Sprite.Acts.Spawn,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Plugins.Sprite.Acts.SetTowardPosition,
		C3.Plugins.Mouse.Exps.X,
		C3.Plugins.Mouse.Exps.Y,
		C3.Plugins.Sprite.Cnds.OnCollision,
		C3.Behaviors.Bullet.Acts.Bounce,
		C3.Plugins.Sprite.Cnds.CompareX,
		C3.Plugins.Sprite.Acts.SetFlipped,
		C3.Plugins.Sprite.Acts.Destroy
	];
};
self.C3_JsPropNameTable = [
	{СледитьЗа: 0},
	{"8Направлений": 0},
	{Спрайт: 0},
	{ТайловыйФон: 0},
	{Твердый: 0},
	{КартаТайловТвёрдый: 0},
	{КартаТайловМягкий: 0},
	{Прикрепить: 0},
	{Ствол: 0},
	{Пуля: 0},
	{УничтожатьЗаПределамиМакета: 0},
	{Пуля1: 0},
	{Мышь: 0},
	{Пуля2: 0},
	{Пуля3: 0}
];

self.InstanceType = {
	Спрайт: class extends self.ISpriteInstance {},
	ТайловыйФон: class extends self.ITiledBackgroundInstance {},
	КартаТайловТвёрдый: class extends self.ITilemapInstance {},
	КартаТайловМягкий: class extends self.ITilemapInstance {},
	Ствол: class extends self.ISpriteInstance {},
	Пуля1: class extends self.ISpriteInstance {},
	Мышь: class extends self.IInstance {},
	Пуля2: class extends self.ISpriteInstance {},
	Пуля3: class extends self.ISpriteInstance {}
}