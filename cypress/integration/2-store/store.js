

context('RUN ALL STORE TESTS', ()=>{
    it('POST, GET, DELETE Order Pet (Chain API)', ()=>{
        cy.fixture('dataStore').then((payload)=>{
            cy.request({
                method : 'POST',
                url : 'https://petstore.swagger.io/v2/store/order',
                headers : {
                    'accept' : "application/json",
                    'Content-Type' : "application/json"
                },
                body: {
                    "id": payload.orderId,
                    "petId": payload.petId,
                    "quantity": payload.quantity,
                    "shipDate": new Date().toISOString(),
                    "status": payload.status,
                    "complete": payload.complete
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).has.property('id', payload.orderId)
                expect(res.body).has.property('petId', payload.petId)
                expect(res.body).has.property('quantity', payload.quantity)
                expect(res.body).has.property('status', payload.status)
                expect(res.body).has.property('complete', payload.complete)
                //show response log
                cy.log(JSON.stringify(res.body))
                
                //chain GET
            }).then((res)=>{
                const ORDERID = res.body.id
                cy.log("OrderID is : " + ORDERID)
                cy.request({
                    method : 'GET',
                    url : 'https://petstore.swagger.io/v2/store/order/' + ORDERID,
                    headers : {
                        'accept' : "application/json"
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('id', ORDERID)
                    expect(res.body).has.property('petId', payload.petId)
                    expect(res.body).has.property('quantity', payload.quantity)
                    expect(res.body).has.property('status', payload.status)
                    expect(res.body).has.property('complete', payload.complete)
                    //show response log
                    cy.log(JSON.stringify(res.body))
                    
                })
                
                //chain DELETE
            }).then((res)=>{
                const ORDERID = res.body.id
                cy.request({
                    method : 'DELETE',
                    url : 'https://petstore.swagger.io/v2/store/order/' + ORDERID,
                    headers : {
                        'accept' : "application/json"
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('code', payload.code)
                    expect(res.body).has.property('type', payload.type)
                    expect(res.body).has.property('message', String(ORDERID))
                    //show response log
                    cy.log(JSON.stringify(res.body))
                    
                })
            })
        })
    })

    it('Get Data Order Pet (without Chain API)', ()=>{
        cy.fixture('dataStore').then((payload)=>{
            cy.request({
                method : 'GET',
                url : 'https://petstore.swagger.io/v2/store/order/'+payload.orderId,
                headers : {
                    'accept' : "application/json"
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.not.be.null
                Cypress.env()
                //show response log
                cy.log(JSON.stringify(res.body))
            })
        })
    })

    it('Get Data Inventory', ()=>{
        cy.request({
            method : 'GET',
            url : 'https://petstore.swagger.io/v2/store/inventory',
            headers : {
                'accept' : "application/json"
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body).to.not.be.null

            //show response log
            cy.log(JSON.stringify(res.body))
        })
    })
})