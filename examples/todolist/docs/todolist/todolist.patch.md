# Todolist 수정 프로세스

### 유스케이스 명: Todolist 수정 (PATCH todolist)

**선행 조건**:

**기본 흐름**:

1. 유저가 특정 카테고리의 todolist 수정 화면으로 접근 후 필수 데이터를 담아 프론트엔드에 수정을 요청한다.
2. 프론트엔드는 유저가 넘겨준 필수 데이터를 다시 백엔드 todolist PATCH API를 요청한다
3. 백엔드는 넘겨준 데이터가 올바른 형식인지 체크한다.
4. 이후에 해당 todolist id를 가진 데이터가 실제로 존재하는지 체크한다.
5. 새로 받아온 데이터로 기존 데이터를 수정한 후 DB에 저장을 요청한다.

**대안 흐름**:

**후행 조건**:

**특별 요구 사항**:

**비즈니스 규칙**:

```plantuml
@startuml
actor Customer
Customer -> Frontend: 유저가 특정 카테고리 todolist 화면에서 todolist 수정 요청
    Frontend -> Backend: todolist 수정 API 요청 PATCH /todolist
        Backend -> TodolistController: PATCH /todolist
            TodolistController -> TodolistService: updateTodolist(updateTodolistDto)
                TodolistService -> DB: 전달받은 todolist id를 가진 데이터가 실제로 있는지 확인
                group if target todolist is not exists
                    DB -> TodolistService: return null
                    TodolistService -> Frontend: throw new NotFoundException(`The todolist you're looking for doesn't exist.`)
                end
                DB -> TodolistService: 데이터 확인
                TodolistService -> TodolistService: 수정된 데이터 저장 this.saveTodolist(updated)
                TodolistService -> DB: 전달받은 데이터를 저장 및 결과 반환
            Backend <-- TodolistService: TodolistResponseType[]
    Frontend <-- Backend: 200 STATUS CODE
Customer <- Frontend: 유저에게 새롭게 수정된 Todolist가 현재 리스트에 추가된 화면 제공.
@enduml
```

# Todolist order 수정 프로세스

### 유스케이스 명: Todolist order 수정 (PATCH todolist order)

**선행 조건**:

**기본 흐름**:

1. 유저가 특정 카테고리의 todolist에 드래그를 이용하여 todolist간 순서를 변경한다.
2. 프론트엔드는 이를 감지하여 변경된 todolist들의 순서를 담아 백엔드에 수정 요청을 보낸다.
3. 백엔드는 넘겨준 데이터가 올바른 형식인지 체크한다.
4. 이후에 해당 todolist들의 id를 가진 데이터들이 실제로 존재하는지 체크한다.
5. 새로 받아온 데이터로 기존 데이터를 수정한 후 DB에 저장을 요청한다.

**대안 흐름**:

**후행 조건**:

**특별 요구 사항**:

**비즈니스 규칙**:

```plantuml
@startuml
actor Customer
Customer -> Frontend: 유저가 특정 카테고리 todolist 화면에서 todolist order 수정 요청
    Frontend -> Backend: todolist order 수정 API 요청 PATCH /todolist/order
        Backend -> TodolistController: PATCH /todolist/order
            TodolistController -> TodolistService: updateTodolistOrder(updateTodolistOrderDto)
                TodolistService -> DB: 전달받은 todolist id를 가진 데이터가 실제로 있는지 확인
                group if target todolist is not exists
                    DB -> TodolistService: return null
                    TodolistService -> Frontend: throw new NotFoundException(`The todolist you're looking for doesn't exist.`)
                end
                DB -> TodolistService: 데이터 확인
                TodolistService -> TodolistService: 수정된 데이터 저장 this.saveTodolist(updated)
                TodolistService -> DB: 전달받은 데이터를 저장 및 결과 반환
            Backend <-- TodolistService: success
    Frontend <-- Backend: 200 STATUS CODE
Customer <- Frontend: 유저가 다음에 앱에 접속할 때 드래그로 변경되었던 상태를 유지한 todolist를 볼 수 있다.
@enduml
```

# Todolist checked 수정 프로세스

### 유스케이스 명: Todolist checked 수정 (PATCH todolist)

**선행 조건**:

**기본 흐름**:

1. 유저가 특정 카테고리의 todolist의 아이템 중 하나를 마쳤다는 표시로 체크 버튼을 누른다.
2. 프론트엔드는 이를 감지하여 todolist의 아이템 중 하나에 checked attribute 변경을 요청한다.
3. 백엔드는 넘겨준 데이터가 올바른 형식인지 체크한다.
4. 이후에 해당 todolist의 id를 가진 데이터가 실제로 존재하는지 체크한다.
5. 새로 받아온 데이터로 기존 데이터를 수정한 후 DB에 저장을 요청한다.
6. 유저는 해당 todolist의 아이템이 사라진 것을 확인한다.

**대안 흐름**:

**후행 조건**:

**특별 요구 사항**:

**비즈니스 규칙**:

```plantuml
@startuml
actor Customer
Customer -> Frontend: 유저가 특정 카테고리 todolist 화면에서 todolist checked 수정 요청
    Frontend -> Backend: todolist 수정 API 요청 PATCH /todolist
        Backend -> TodolistController: PATCH /todolist
            TodolistController -> TodolistService: updateTodolist(updateTodolistDto)
                TodolistService -> DB: 전달받은 todolist id를 가진 데이터가 실제로 있는지 확인
                group if target todolist is not exists
                    DB -> TodolistService: return null
                    TodolistService -> Frontend: throw new NotFoundException(`The todolist you're looking for doesn't exist.`)
                end
                DB -> TodolistService: 데이터 확인
                TodolistService -> TodolistService: 수정된 데이터 저장 this.saveTodolist(updated)
                TodolistService -> DB: 전달받은 데이터를 저장 및 결과 반환
            Backend <-- TodolistService: success
    Frontend <-- Backend: 200 STATUS CODE
Customer <- Frontend: 유저가 다음에 앱에 접속할 때 드래그로 변경되었던 상태를 유지한 todolist를 볼 수 있다.
@enduml
```
