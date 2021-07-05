# Generate Tui Icons

Following the official documentation on https://taiga-ui.dev/icon-set to format the svg icons to fit with `tui-svg` tag.

## Usage:

1. Drag & drop icons to this folder.
2. Open Terminal at this folder.
3. Run command:
   ```bash
   node process-icons.js
   ```
4. Go to `THIS_LIB.../lib/providers/icons.provider.ts`
5. Declare new icons to the `MAPPER` variable.
6. Check your AppModule whether provides it, if not provide `CUSTOM_ICONS_PROVIDER` to your AppModule providers.
7. Check your `angular.json` whether copies these assets, if not copy to `APP_NAME.build.options.assets` array
   ```json
   {
      "glob": "**/*.svg",
      "input": "libs/admin/core/util/src/assets/icons",
      "output": "assets/adc/icons"
   },
   ```
