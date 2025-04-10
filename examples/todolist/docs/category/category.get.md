# Category 조회 프로세스

### 유스케이스 명: Category 조회 (Get category)

**선행 조건**:

**기본 흐름**:

1. 유저가 앱 메인 페이지['/'] 에 접속한다.
2. Todolist를 담은 Category들의 리스트를 요청한다.
3. 프론트엔드는 요청에 따라 쿼리에 deleted를 추가해 보낸다.
4. 프론트엔드가 쿼리에 아무것도 담지 않을시에 백엔드는 deleted가 false인 값만 보내준다.

**대안 흐름**:

**후행 조건**:

**특별 요구 사항**:

**비즈니스 규칙**:

```plantuml
@startuml
actor Customer
Customer -> Frontend: 앱 메인 페이지 입장 /
    Frontend -> Backend: Category 조회 API 요청 GET /category?deleted=boolean
        Backend -> CategoryController: GET /category
            CategoryController -> CategoryService: getCategories('true' | 'false' | undefined)
                CategoryService -> CategoryService: 매개변수 변환 string -> boolean
                CategoryService -> DB: findAll(check: boolean) 요청
                DB -> CategoryService: check값에 따른 조회 결과 반환
            Backend <-- CategoryService: true
    Frontend <-- Backend: 200 STATUS CODE
Customer <- Frontend: 메인 페이지 Category 리스트에 요청한 Category들이 있다.
@enduml
```

### 유스케이스 명: 특정 Category 조회 (Get category)

**선행 조건**:

**기본 흐름**:

1. 유저가 특정 Category 조회를 요청한다.
2. 프론트엔드는 Category 조회에 대한 모달 혹은 페이지 이동을 한다. 3. 프론트엔드는 백엔드에 Category 조회 API를 요청한다 GET /category/:categoryId
3. 백엔드는 categoryId가 UUID 타입이 맞는지 확인한다.
4. UUID타입이 맞다면 이후에 DB에 존재하는 categoryID인지 확인한다.
5. 백엔드는 올바른 Category를 반환한다.

**대안 흐름**:

1. 현재 Validator가 params로 들어오는 데이터가 UUID인지 확인하는데 과한 체크인 것 같음.
2. DB에 해당하는 id가 없으면 어차피 error를 반환한다.
3. validator 수정 논의 필요.

**후행 조건**:

**특별 요구 사항**:

**비즈니스 규칙**:

```plantuml
@startuml
actor Customer
Customer -> Frontend: 특정 Category에 대해 조회
    Frontend -> Backend: 특정 Category 조회 API 요청
        Backend -> CategoryController: GET /category/:categoryId
            CategoryController -> CategoryService: getCategoryById(categoryId)
                CategoryService -> CategoryService: findCategoryById(categoryId)
                CategoryService -> DB: findById(categoryId) 요청
                group if target category is not exists
                    DB -> CategoryService: return null
                    CategoryService -> Frontend: throw new NotFoundException(`The category you're looking for doesn't exist.`)
                end
                DB -> CategoryService: 요청에 부합하는 Category 반환
            Backend <-- CategoryService: true
    Frontend <-- Backend: 200 STATUS CODE
Customer <- Frontend: 특정 Category에 대한 데이터 제공
@enduml
```
