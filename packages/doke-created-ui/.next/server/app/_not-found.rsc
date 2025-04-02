1:"$Sreact.fragment"
3:I[5244,[],""]
4:I[3866,[],""]
5:I[6213,[],"OutletBoundary"]
8:I[6213,[],"ViewportBoundary"]
a:I[6213,[],"MetadataBoundary"]
c:I[4835,[],""]
:HL["/_next/static/media/c4250770ab8708b6-s.p.woff2","font",{"crossOrigin":"","type":"font/woff2"}]
:HL["/_next/static/css/64bde3eb31b7026c.css","style"]
:HL["/_next/static/css/428def52b5e72d9b.css","style"]
0:{"P":null,"b":"l-A62TZvEnKMx60Qvzh-s","p":"","c":["","_not-found"],"i":false,"f":[[["",{"children":["/_not-found",{"children":["__PAGE__",{}]}]},"$undefined","$undefined",true],["",["$","$1","c",{"children":[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/64bde3eb31b7026c.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}],["$","link","1",{"rel":"stylesheet","href":"/_next/static/css/428def52b5e72d9b.css","precedence":"next","crossOrigin":"$undefined","nonce":"$undefined"}]],"$L2"]}],{"children":["/_not-found",["$","$1","c",{"children":[null,["$","$L3",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","forbidden":"$undefined","unauthorized":"$undefined"}]]}],{"children":["__PAGE__",["$","$1","c",{"children":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":404}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"$undefined",null,["$","$L5",null,{"children":["$L6","$L7",null]}]]}],{},null,false]},null,false]},null,false],["$","$1","h",{"children":[["$","meta",null,{"name":"robots","content":"noindex"}],["$","$1","jkNKcl58U2j5lg97AQ3Rh",{"children":[["$","$L8",null,{"children":"$L9"}],["$","meta",null,{"name":"next-size-adjust","content":""}]]}],["$","$La",null,{"children":"$Lb"}]]}],false]],"m":"$undefined","G":["$c","$undefined"],"s":false,"S":true}
9:[["$","meta","0",{"charSet":"utf-8"}],["$","meta","1",{"name":"viewport","content":"width=device-width, initial-scale=1"}]]
6:null
7:null
b:[["$","link","0",{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined","precedence":"default"}]]
d:I[6404,["190","static/chunks/190-ac6596d2e7de33fc.js","546","static/chunks/546-1b6060f165f8e5fd.js","177","static/chunks/app/layout-5497187e79f34db3.js"],"ActiveSectionProvider"]
e:I[8687,["190","static/chunks/190-ac6596d2e7de33fc.js","546","static/chunks/546-1b6060f165f8e5fd.js","177","static/chunks/app/layout-5497187e79f34db3.js"],"EndpointsDataProvider"]
f:I[4482,["190","static/chunks/190-ac6596d2e7de33fc.js","546","static/chunks/546-1b6060f165f8e5fd.js","177","static/chunks/app/layout-5497187e79f34db3.js"],"Sidebar"]
2:["$","html",null,{"lang":"en","children":["$","body",null,{"children":["$","div",null,{"className":"flex","children":["$","$Ld",null,{"children":[["$","$Le",null,{"endpointData":[{"controllerName":"Category","basePath":"category","description":"Category management API endpoints","tags":["Category"],"endpoints":[{"path":"","method":"POST","name":"Create Category","description":"This endpoint creates a new category for organizing todolist items within the system.\n  It requires a title parameter which specifies the name of the category to be created.\n  The response returns the complete category object with its generated unique identifier, title, timestamps, and deletion status.\n  This endpoint is the first step in establishing a hierarchical organization system for todolists, allowing for logical grouping of related tasks.","request":{"body":{"properties":{"title":{"type":"string","description":"카테고리 제목","required":true}}},"headers":{"properties":{"Content-Type":{"default":"application/json"},"Authorization":{"default":"","credentials":{"type":"Bearer"}}}}},"response":{"example":{"id":"98874008-8915-4d53-9239-3913f7ee2089","title":"Test title","createdAt":"2025-02-10T13:00:27.440Z","updatedAt":"2025-02-10T13:00:27.440Z","deleted":false}}},{"path":"","method":"GET","name":"Get Categories","description":"This endpoint retrieves a list of all categories in the system with optional filtering by deletion status.\n  It accepts an optional \"deleted\" query parameter that allows filtering results to show only active categories, only deleted categories, or all categories.\n  The response returns an array of category objects, each containing complete information including identifier, title, timestamps, and deletion status.\n  This endpoint is ideal for populating category selection dropdowns, displaying category management interfaces, or generating reports on category usage.","request":{"query":{"properties":{"deleted":{"type":"boolean","description":"Get all category Based on the query.","required":false}}}},"response":{"example":{"data":[{"id":"16874008-8915-4d53-9239-3913f7ee2089","title":"Test title","createdAt":"2025-02-10T13:00:27.440Z","updatedAt":"2025-02-10T13:00:27.440Z","deleted":false},{"id":"40874008-8915-4d53-9239-3913f7ee2089","title":"Test title","createdAt":"2025-02-10T13:00:27.440Z","updatedAt":"2025-02-10T13:00:27.440Z","deleted":false},{"id":"98874008-8915-4d53-9239-3913f7ee2089","title":"Test title","createdAt":"2025-02-10T13:00:27.440Z","updatedAt":"2025-02-10T13:00:27.440Z","deleted":false}],"total":3}}},{"path":"/:categoryId","method":"GET","name":"Get Category By Id","description":"This endpoint retrieves detailed information about a specific category identified by its unique categoryId.\n  It returns the complete category object including its identifier, title, timestamps, and deletion status.\n  The endpoint will return information even for soft-deleted categories, allowing applications to check deletion status.\n  This endpoint is useful for viewing category details, verifying existence, or checking status before performing operations on the category.","request":{"params":{"properties":{"categoryId":{"type":"string","description":"Target category Id that you find","required":true}}}},"response":{"example":{"id":"16874008-8915-4d53-9239-3913f7ee2089","title":"Test title","createdAt":"2025-02-10T13:00:27.440Z","updatedAt":"2025-02-10T13:00:27.440Z","deleted":false}}},{"path":"/:categoryId","method":"PATCH","name":"Update Category","description":"This endpoint updates the properties of a specific category identified by its unique categoryId parameter.\n  It allows modifying the category's title and potentially other properties (though the request body specification appears incomplete in this definition).\n  The response returns the complete updated category object with all its properties, including the modified fields and refreshed updatedAt timestamp.\n  Note that this endpoint appears to be missing the request body definition which would typically specify which fields can be updated.","request":{"params":{"properties":{"categoryId":{"type":"string","description":"Target category id that you want update","required":true}}},"body":{"properties":{"title":{"type":"string","description":"Write title of category that you want update","required":false}}},"headers":{"properties":{"Content-Type":{"default":"application/json"}}}},"response":{"example":{"id":"98874008-8915-4d53-9239-3913f7ee2089","title":"Test title","createdAt":"2025-02-10T13:00:27.440Z","updatedAt":"2025-02-10T13:00:27.440Z","deleted":false}}},{"path":"/soft/:categoryId","method":"DELETE","name":"Soft Delete Category By Id","description":"This endpoint performs a soft delete on a specific category identified by its unique categoryId.\n  The operation marks the category as deleted in the database rather than permanently removing it, enabling potential recovery if needed.\n  The response returns the complete category object with updated deletion status and timestamp information.\n  When a category is deleted, all associated todolist items typically become inaccessible through normal API operations.","request":{"params":{"properties":{"categoryId":{"type":"string","description":"Target category id that you want delete","required":true}}},"headers":{"properties":{"Authorization":{"default":"","credentials":{"type":"Bearer"}}}}},"response":{"example":{"id":"98874008-8915-4d53-9239-3913f7ee2089","title":"Test title","createdAt":"2025-02-10T13:00:27.440Z","updatedAt":"2025-02-10T13:00:27.440Z","deleted":true}}}]},{"controllerName":"Todolist","basePath":"todolist","description":"Todolist management API endpoints","tags":["Todolist"],"endpoints":[{"path":"","method":"POST","name":"Create Todolist","description":"\n      This endpoint creates a new todolist item within a specified category. \n      Users must provide a title and a valid categoryId as required parameters. \n      The newly created todolist will be automatically assigned an order value within its category, a unique ID, \n      and will be set to unchecked (incomplete) status by default while timestamps for creation and updates are recorded.\n    ","request":{"body":{"properties":{"title":{"type":"string","description":"Write title of todolist create you want","required":true},"categoryId":{"type":"string","description":"The location category ID for which you want to create a todolist","required":true}}},"headers":{"properties":{"Content-Type":{"default":"application/json"}}}},"response":{"example":{"id":"ea2a1198-9b29-4258-9021-409b81f57caf","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"create test todolist","checked":false,"order":13,"createdAt":"2025-02-11T09:30:08.938Z","updatedAt":"2025-02-11T09:30:08.938Z"}}},{"path":"","method":"GET","name":"Get Todolists","description":"This endpoint retrieves all todolist items across all categories in the system.\n  It returns a comprehensive array of todolist objects containing complete details for each item.\n  Each todolist object includes its unique identifier, associated category, title, completion status, order position, and timestamp information.\n  This endpoint is useful for global views, dashboard displays, or administrative interfaces that need to show all todolist items regardless of category.","request":{},"response":{"example":{"data":[{"id":"ea2a1198-9b29-4258-9021-409b81f57caf","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"create test todolist","checked":false,"order":1,"createdAt":"2025-02-11T09:30:08.938Z","updatedAt":"2025-02-11T09:30:08.938Z"},{"id":"252a1198-9b29-4258-9021-409b81f57caf","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"create test todolist","checked":false,"order":2,"createdAt":"2025-02-11T09:30:08.938Z","updatedAt":"2025-02-11T09:30:08.938Z"},{"id":"132a1198-9b29-4258-9021-409b81f57caf","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"create test todolist","checked":false,"order":3,"createdAt":"2025-02-11T09:30:08.938Z","updatedAt":"2025-02-11T09:30:08.938Z"}],"total":3}}},{"path":"/:categoryId","method":"GET","name":"Get Todolists By Category Id","description":"\n      This endpoint retrieves a list of todolist items for a specific category identified by the categoryId parameter.\n      It allows optional filtering by completion status using the \"checked\" query parameter.\n      The response returns an array of todolist items with their complete details including ID, title, order, completion status, and timestamps.\n      This endpoint is ideal for displaying all todolist items within a specific category, supporting both complete and incomplete item views.\n    ","request":{"query":{"properties":{"checked":{"type":"boolean","description":"A status value that distinguishes completed from incomplete todolist","required":false}}},"params":{"properties":{"categoryId":{"type":"string","description":"The location category's id for which you find todolist's","required":true}}}},"response":{"example":{"data":[{"id":"ea2a1198-9b29-4258-9021-409b81f57caf","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"create test todolist","checked":false,"order":1,"createdAt":"2025-02-11T09:30:08.938Z","updatedAt":"2025-02-11T09:30:08.938Z"},{"id":"252a1198-9b29-4258-9021-409b81f57caf","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"create test todolist","checked":false,"order":2,"createdAt":"2025-02-11T09:30:08.938Z","updatedAt":"2025-02-11T09:30:08.938Z"},{"id":"132a1198-9b29-4258-9021-409b81f57caf","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"create test todolist","checked":false,"order":3,"createdAt":"2025-02-11T09:30:08.938Z","updatedAt":"2025-02-11T09:30:08.938Z"}],"total":3}}},{"path":"/dates/:categoryId","method":"GET","name":"Get Todolists By Date","description":"\n      This endpoint retrieves todolist items organized by date for a specific category. \n      It allows filtering by completion status through the optional \"checked\" query parameter. The response returns todolist items grouped by date, \n      with each date containing an array of todolist objects that were either created or updated on that date. \n      This endpoint is particularly useful for displaying calendar views or tracking todolist activity over time.\n    ","request":{"query":{"properties":{"checked":{"type":"boolean","description":"A status value that distinguishes completed from incomplete todolist","required":false}}},"params":{"properties":{"categoryId":{"type":"string","description":"The location category's id for which you find todolist's","required":true}}}},"response":{"example":{"data":[{"date":"2025-02-02","todolists":[{"id":"535edc91-2d9a-404c-a400-175a8e5b2a08","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"changed","checked":true,"order":12,"createdAt":"2025-02-02T23:46:46.529Z","updatedAt":"2025-02-02T23:46:54.255Z"},{"id":"c62af2fe-4f20-4ed4-8242-ea4deb243e05","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"somethin","checked":true,"order":11,"createdAt":"2025-02-02T23:46:27.215Z","updatedAt":"2025-02-02T23:46:28.977Z"}]},{"date":"2025-01-31","todolists":[{"id":"2a9441d7-b8c9-4e03-960f-10215801751a","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"Wabirubi dupdup!!!","checked":true,"order":0,"createdAt":"2025-01-22T03:05:22.323Z","updatedAt":"2025-01-31T23:26:47.174Z"}]}],"total":2}}},{"path":"","method":"PATCH","name":"Update Todo","description":"This endpoint updates the properties of a specific todolist item identified by its unique ID.\n  It allows modifying the title and/or completion status of the todolist item, with both fields being optional.\n  The response returns the complete updated todolist object with all its properties, including the modified fields and updated timestamp.\n  This endpoint supports partial updates, making it flexible for various editing scenarios like marking items complete or renaming tasks.","request":{"body":{"properties":{"id":{"type":"string","description":"Target todolist id that you want update","required":true},"title":{"type":"string","description":"The title of the todolist you want to update","required":false},"checked":{"type":"boolean","description":"Update the completion status of the todolist you want to update property","required":false}}},"headers":{"properties":{"Content-Type":{"default":"application/json"}}}},"response":{"example":{"id":"d55232cb-c8df-465e-8ea7-ce11e884dc2e","categoryId":"f144cc78-34d9-4d0a-9e95-48cf7102dce3","title":"update title","checked":true,"order":2,"createdAt":"2025-01-22T03:04:28.724Z","updatedAt":"2025-02-11T10:01:42.379Z"}}},{"path":"/order","method":"PATCH","name":"Update Todo Order","description":"This endpoint updates the display order of a specific todolist item within its category.\n  It requires both the todolist's unique identifier and the new numerical order position to be provided.\n  The order value determines the position of the todolist item when displayed in a sequence with other items.\n  This endpoint is essential for implementing drag-and-drop reordering functionality or manual sorting of todolist items.","request":{"body":{"properties":{"id":{"type":"string","description":"Target todolist id that you want update","required":true},"order":{"type":"number","description":"The order number of the todolist you want to update","required":true}}},"headers":{"properties":{"Content-Type":{"default":"application/json"}}}},"response":{}}]}],"children":["$","$Lf",null,{}]}],["$","main",null,{"className":"flex-1","children":["$","$L3",null,{"parallelRouterKey":"children","error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L4",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":"$0:f:0:1:2:children:2:children:1:props:children:0:1:props:style","children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":"$0:f:0:1:2:children:2:children:1:props:children:0:1:props:children:props:children:1:props:style","children":404}],["$","div",null,{"style":"$0:f:0:1:2:children:2:children:1:props:children:0:1:props:children:props:children:2:props:style","children":["$","h2",null,{"style":"$0:f:0:1:2:children:2:children:1:props:children:0:1:props:children:props:children:2:props:children:props:style","children":"This page could not be found."}]}]]}]}]],"$undefined",[]],"forbidden":"$undefined","unauthorized":"$undefined"}]}]]}]}]}]}]
