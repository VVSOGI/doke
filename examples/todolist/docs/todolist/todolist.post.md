# Todolist 생성 프로세스

### 유스케이스 명: Todolist 생성 (Post todolist)

**선행 조건**:

**기본 흐름**:

1. 유저가 특정 카테고리의 todolist 화면으로 접근 및 생성을 요청한다.
2. 프론트엔드는 유저가 제공해준 필수 데이터를 담아 백엔드에 생성 API를 요청한다.
3. 백엔드는 필수 데이터인 title과 categoryId가 타입 형식에 맞게 잘 전달되었는지 확인한다.
4. 필수 데이터를 이용해서 새로운 todolist 데이터를 만든 후 저장한다.
5. 프론트엔드에게 생성된 데이터 결과값을 전달한다.
6. 프론트엔드는 유저에게 생성된 Todolist가 존재하는 화면을 보여준다.

**대안 흐름**:

**후행 조건**:

**특별 요구 사항**:

**비즈니스 규칙**:

```plantuml
@startuml
actor Customer
Customer -> Frontend: 유저가 특정 카테고리 todolist 화면에서 todolist 생성 요청
    Frontend -> Backend: todolist 생성 API 요청 POST /todolist
        Backend -> TodolistController: POST /todolist
            TodolistController -> TodolistService: createTodolist(createTodolistDto)
                TodolistService -> DB: findLastOrder(categoryId) categoryId에 일치하는 모든 투두리스트들 중 가장 순서가 높은 투두를 가져온다.
                DB -> TodolistService: 데이터 반환
                TodolistService -> DB: 전달받은 데이터를 이용한 새로운 todolist 데이터 생성 요청
                DB -> TodolistService: 새로운 데이터 생성 및 반환
                TodolistService -> TodolistService: 생성된 데이터 저장 this.saveTodolist(created)
                TodolistService -> DB: 전달받은 데이터를 저장 및 결과 반환
            Backend <-- TodolistService: TodolistResponseType[]
    Frontend <-- Backend: 200 STATUS CODE
Customer <- Frontend: 유저에게 새롭게 생성된 Todolist가 현재 리스트에 추가된 화면 제공.
@enduml
```
