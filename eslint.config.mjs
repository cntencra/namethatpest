import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

   {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: ["@typescript-eslint"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/typedef": [
        "warn",
        {
          arrowParameter: true,
          variableDeclaration: true,
        },
      ],
    },
  },
];

export default eslintConfig;
