install:
	bun install

format:
	bun run prettier --write "src/**/*.{js,ts,vue,css}"
