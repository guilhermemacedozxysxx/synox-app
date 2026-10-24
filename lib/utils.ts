import { createCn } from "cn/config"

/* Registra as classes de tipografia da Synox (text-14-bold etc.) como tamanho de fonte, para não serem confundidas com cor de texto */

const typographySizes = ["12", "14", "16", "18", "20", "24", "30"]
const typographyWeights = ["bold", "semibold", "regular"]

export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: typographySizes.flatMap((size) =>
            typographyWeights.map((weight) => `${size}-${weight}`)
          ),
        },
      ],
    },
  },
})
