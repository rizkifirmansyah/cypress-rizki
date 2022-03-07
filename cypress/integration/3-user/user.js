

context('RUN ALL USER TESTS', ()=>{
    it('Create User', ()=>{
        cy.fixture('dataUser').then((payload)=>{
            cy.request({
                method : 'POST',
                url : 'https://petstore.swagger.io/v2/user',
                headers : {
                    'accept' : "application/json",
                    'Content-Type' : "application/json"
                },
                body: {
                    "id": payload.id,
                    "username": payload.username,
                    "firstName": payload.firstName,
                    "lastName": payload.lastName,
                    "email": payload.email,
                    "password": payload.password,
                    "phone": payload.phone,
                    "userStatus": payload.userStatus
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).has.property('code', 200)
                expect(res.body).has.property('type', payload.type)
                expect(res.body).has.property('message', String(payload.id))
                //show response log
                cy.log(JSON.stringify(res.body))
            })
        })
    })

    //login
    it('Login User', ()=>{
        cy.fixture('dataUser').then((payload)=>{
        cy.request({
            method : 'GET',
            url : 'https://petstore.swagger.io/v2/user/login?username=' + payload.user + '&password=' + payload.password ,
            headers : {
                "accept" : "application/json"
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body).has.property('code', res.body.code)
            expect(res.body).has.property('type', res.body.type)
            expect(res.body).has.property('message', res.body.message)
            //show response log
            cy.log(JSON.stringify(res.body))
            })
        })
    })

    //logout
    it('Logout User', ()=>{
        cy.fixture('dataUser').then(()=>{
            cy.request({
                method : 'GET',
                url : 'https://petstore.swagger.io/v2/user/logout' ,
                headers : {
                    "accept" : "application/json"
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).has.property('code', res.body.code)
                expect(res.body).has.property('type', res.body.type)
                expect(res.body).has.property('message', res.body.message)
                //show response log
                cy.log(JSON.stringify(res.body))
            })
        })
    })


    //chain
    it('Chain API User (Get, Put, Delete)', ()=>{
        cy.log("GET USER")
        cy.fixture('dataUser').then((payload)=>{
            cy.request({
                method : 'GET',
                url : 'https://petstore.swagger.io/v2/user/' + payload.username,
                headers : {
                    "accept" : "application/json"
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).has.property('id', payload.id)
                expect(res.body).has.property('username', payload.username)
                expect(res.body).has.property('firstName',payload.firstName)
                expect(res.body).has.property('lastName',payload.lastName)
                expect(res.body).has.property('email',payload.email)
                expect(res.body).has.property('password',payload.password)
                expect(res.body).has.property('phone',payload.phone)
                expect(res.body).has.property('userStatus',payload.userStatus)
                //show response log
                cy.log(JSON.stringify(res.body))
            })

        //update data user
        }).then((res)=>{
            cy.fixture('dataUpdateUser.json').then((dataUpdateUser2) => {
            
            cy.log("UPDATE USER")
            const user = res.body.username
            cy.log(user)
            cy.request({
                method : 'PUT',
                url : 'https://petstore.swagger.io/v2/user/' + user ,
                headers : {
                    'accept' : "application/json",
                    'Content-Type' : "application/json"
                },
                body: {
                    "id": dataUpdateUser2.id,
                    "username": dataUpdateUser2.username,
                    "firstName": dataUpdateUser2.firstName,
                    "lastName": dataUpdateUser2.lastName,
                    "email": dataUpdateUser2.email,
                    "password": dataUpdateUser2.password,
                    "phone": dataUpdateUser2.phone,
                    "userStatus": dataUpdateUser2.userStatus
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).has.property('code', 200)
                expect(res.body).has.property('type', res.body.type)
                expect(res.body).has.property('message', res.body.message)
                //show response log
                cy.log(JSON.stringify(res.body))
            })
        })

            //delete user
        }).then(()=>{
            cy.log("DELETE USER")
            cy.fixture('dataUser').then((payload)=>{
            const user = payload.username
            cy.log(user)
            cy.request({
                method : 'DELETE',
                url : 'https://petstore.swagger.io/v2/user/' + user ,
                headers : {
                    'accept' : "application/json"
                },
            }).then((res)=>{
                cy.log(JSON.stringify(res.body))
                expect(res.status).to.eq(200)
                expect(res.body).has.property('code', 200)
                expect(res.body).has.property('type', res.body.type)
                expect(res.body).has.property('message', res.body.message)
                //show response log
                
                })
            })
        })
    })

    //Create User With Arrey
    it('Create user with Array', ()=>{
        cy.fixture('ArrayUser').then(testdata =>{
            testdata.forEach(data => {
                cy.request({
                    method : 'POST',
                    url : 'https://petstore.swagger.io/v2/user/createWithArray' ,
                    headers : {
                        'accept' : "application/json",
                        'Content-Type' : "application/json"
                    },
                    body : [{
                        "id": data.id,
                        "username": data.username,
                        "firstName": data.firstName,
                        "lastName": data.lastName,
                        "email": data.email,
                        "password": data.password,
                        "phone": data.phone,
                        "userStatus": data.userStatus
                        
                    }]
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('code', 200)
                    expect(res.body).has.property('type', 'unknown')
                    expect(res.body).has.property('message', 'ok')
                    //show response log
                    cy.log(JSON.stringify(res.body))
                })
                })
                
            })  
        })

    //Create User With List
    it('Create user with Array List', ()=>{
        cy.fixture('ArrayUser').then(testdata =>{
            testdata.forEach(data => {
                cy.request({
                    method : 'POST',
                    url : 'https://petstore.swagger.io/v2/user/createWithArray' ,
                    headers : {
                        'accept' : "application/json",
                        'Content-Type' : "application/json"
                    },
                    body : [{
                        "id": data.id,
                        "username": data.username,
                        "firstName": data.firstName,
                        "lastName": data.lastName,
                        "email": data.email,
                        "password": data.password,
                        "phone": data.phone,
                        "userStatus": data.userStatus
                        
                    }]
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('code', 200)
                    expect(res.body).has.property('type', 'unknown')
                    expect(res.body).has.property('message', 'ok')
                    //show response log
                    cy.log(JSON.stringify(res.body))
                })
                })
                
            })  
        })
})

