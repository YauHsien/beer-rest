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
| Priming Amount | Arbitrary string or 'N/A**|                  |

## APIs

- Recipes API
- Filter API

### 查詢手段

因 NodeJS 給的 HTTP 請求規格， GET 檔頭加傳遞內容總共最多可傳 80KB 量，使得行業裏當有些人要設計大量查詢欄位時，會先將 API 通訊協定設計為以 POST 進行查詢。 Brewer's Friend 網站也如此。

我設計 Filter API 是為了在 Recipes API 簡化過濾查詢，用 session-token 識別查詢條件。

一個 token 代表一位使用者當下要用的一批查詢條件；多少個使用者 session ，系統就支援多少批查詢條件。步調上，使用者先把一批啤酒查詢條件傳過去，系統登記那些查詢條件，查詢批次用 token 識別，之後，在食譜 API 傳遞查詢條件 token，表示要求 Recipes API 依照使用者在 Filter 登記的條件來查詢。

此設計的**好處**：對 Recipes 來說，Filter 是它的外部服務，透過 Filter 服務來獲取大量有關於該用戶的配置，對 Recipes 自己實作上，比較簡單，並且自然而然分別 Recipes 與 Recipe Filter 二個模組。就 Rest 流線上，比較單純，較符合 Rest 原則，對資源的想法也夠清楚：Post 方法就是有系統生成了一個新東西，而我得到那個東西的 Id；Put 方法就是造成一些變動，但我要等下一次 Get 的時候，才獲得已經更動的東西。

### Recipes API
|Goal|Method|Resource|
|----|------|--------|
|Information|Get|/recipes|
|Listings with filter|Get|/recipes?f(ilter)=`{{filter id}}`|
|Specific item|Get|/recipes/:id|
|Create|Post|/recipes|
|Update|Put|/recipes/:id|
|Delete|Delete|/recipes/:id|

### Filter API
|Goal|Method|Resource|
|----|------|--------|
|Information|Get|/filters|
|Specific filter|Get|/filters/:id|
|Create a stub|Post|/filters|
|Register a filter entry into some stub|Put|/filters/:id|
|Delete|Delete|/filters/:id|

#### POST `/filters`
To create a filter stub.

- **Request**

  Body

  ```json
  { "token": "{{token}}" }
  ```
- **Success Resopnse**

  Status Code

  - 200 `Success`

  Content

  ```json
  { "id": "{{id}}" }
  ```

#### GET `/filters/:id`
To get specific filter `:id`.

- **Success Response**

  Status Code

  - 200 `Success`

  Content

  ```json
  {
      "token": "{{token}}",
      "field1": ...
      ... // Other fields.
  }
  ```

  ```json
  {   "error": "Cannot find entry"  }
  ```

#### PUT `/filters/:id`
To register a filter entry on the filter `:id`.

- **Request**

  Body

  ```json
  {
      "field1": "{{value1}}",
      "filed2": "{{value2}}",
      ... // Other fields.
  }
  ```

- **Success Response**

  Status Code

  - 200 `Success`

  Content

  ```json
  {   "result": "ok"  }
  ```

#### DELETE `/filters/:id`
To deprecate a filter.


- **Success Response**

  Status Code

  - 200 `Success`

  Content

  ```json
  {   "result": "ok"  }
