# Bear, Bear, Bear (beer-rest)
An API to Charlie Mops.

## Oversall Goals

- To retrieve recipe entries by filtering
- To get specific recipe.
- To create a recipe.
- To update a recipe.
- To delete a recipe.

## 練習重點

重點展現在運用 TypeScript 建構 Rest APIs，為服務單元。

背景資料用程式與資料陣列方式處理；為截除資料庫複雜因素，故不使用 SQL 與關聯式資料庫。

That is, a list of data with a 1-based `ID` field are concated to a base array `[null]` to fit its index base, so I can query initial data like using 1-based array.

On deletion and vacancy. Each entry has a special field `deleted?: boolean` for deletion semantics, while both the `[0]` entry and entry at out of range of the array are interpreted as absent. Deleted entries are wasted and never be reused, for this simple demo purpose.

On creation. New entry will be put right after the latest entry of the array, while creation extends the array.

On feasibility and update. All feasible entries are also updatable.

### Data Fields

| Name           | Data Type        | Description               |
|----------------|------------------|---------------------------
| Beer ID        | Positive integer | Record identity           |
| Name           | Arbitrary string | Brand or descriptive name |
| URL            | Path string      | Resource indicator        |
| Style          | String           | Style name                |
| Style ID       | Positive integer | Style identity            |
| Size(L)        | Number           | Volume in liter           |
| OG             | Number           | Original Gravity （毛糖比） |
| FG             | Number           | Final Gravity （淨糖比）    |
| ABV            | Number           | Alcohol by Volume （酒精度）|
| IBU            | Number           | International Bitter Unit （公定苦度）|
| Color          | Number           | 成色                      |
| Boil Size      | Number           | 熬製量                    |
| Boil Time      | Number           | 熬製時間                   |
| Boil Gravity   | Number or 'N/A'  | 熬製比例                   |
| Efficiency     | Number           |                          |
| Mash Thickness | Number or 'N/A'  | 糖漿厚度                   |
| Sugar Scale    | 'Plato' or 'Specific Gravity'|糖度           |
| Brew Method    | 'All Grain' or 'BIAB' or 'extract' or 'Partial Mash'|釀製法|
| Pitch Rate     | Number or 'N/A'  |                          |
| Primary Temp   | Number or 'N/A'  |                          |
| Priming Method | Arbitrary string or 'N/A'|                  |
| Priming Amount | Arbitrary string or 'N/A'|                  |

## APIs

- Recipes API
- Filter API

### Recipes API
|Goal|Method|Resource|
|----|------|--------|
|Information|Get|/recipes|
|Listings with filter|Get|/recipes?f(ilter)=<token>|
|Specific item|Get|/recipes/:id|
|Create|Post|/recipes|
|Update|Put|/recipes/:id|
|Delete|Delete|/recipes/:id|

### Filter API
|Goal|Method|Resource|
|----|------|--------|
|Information|Get|/filters|
|Specific filter token|Get|/filters/:id|
|Create a stub|Post|/filters|
|Register a filter entry into some stub|Put|/filters?f(ilter)=<token>|
|Delete|Delete|/filters/:id|
