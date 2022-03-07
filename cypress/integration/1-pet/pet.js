context('RUN ALL PET TESTS', ()=>{
    //get pets by status
    it('Find Pets by Status', ()=>{
        cy.fixture('dataPet').then((payload)=>{
            cy.request({
                method : 'GET',
                url : 'https://petstore.swagger.io/v2/pet/findByStatus?status=' + payload.status,
                headers : {
                    'accept' : "application/json"
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.not.be.null
                
                for(var i = 0 ; i < res.body.length ; i++){
                    expect(res.body[i]).has.property('status', payload.status)
                }
                
                //show response log
                cy.log(JSON.stringify(res.body))
            })
        })
    })

    //add new pet
    it('Add a new pet to the store', ()=>{
        cy.log("CREATE PET")
        cy.fixture('dataPet').then((payload)=>{
            cy.request({
                method : 'POST',
                url : 'https://petstore.swagger.io/v2/pet',
                headers : {
                    'accept' : "application/json",
                    'Content-Type' : "application/json"
                },
                body : {
                    "id": payload.petId,
                    "category": {
                        "id": payload.categoryId,
                        "name": payload.categoryName
                    },
                    "name": payload.petName,
                    "photoUrls": payload.photoUrls,
                    "tags": [
                        {
                        "id": payload.tagsId,
                        "name": payload.tagsName
                        }
                    ],
                    "status": payload.statusPet
                }
            }).then((res)=>{
                expect(res.status).to.eq(200)
                    expect(res.body).has.property('id', payload.petId)
                    expect(res.body.category).has.property('id', payload.categoryId)
                    expect(res.body.category).has.property('name', payload.categoryName)
                    expect(res.body).has.property('name', payload.petName)
                    expect(res.body.photoUrls).to.deep.eq((payload.photoUrls))
                    for(var i = 0 ; i < res.body.tags.length ; i++){
                        expect(res.body.tags[i]).has.property('id', payload.tagsId)
                        expect(res.body.tags[i]).has.property('name', payload.tagsName)
                    }
                
                //show response log
                cy.log(JSON.stringify(res.body))
                
                
            //get pet
            }).then((res)=>{
                const ID = res.body.id
                cy.log("GET PET")
                cy.log("Pet Id : " + ID)
                cy.request({
                    method : 'GET',
                    url : 'https://petstore.swagger.io/v2/pet/' + ID,
                    headers : {
                        'accept' : "application/json"
                    }
                    }).then((res)=>{
                        expect(res.status).to.eq(200)
                        expect(res.body).has.property('id', ID)
                        //show response log
                        cy.log(JSON.stringify(res.body))
                })

            //update pet
            }).then((res)=>{
            const ID = res.body.id
            cy.log("UPDATE PET")
            cy.fixture('updateDataPet.json').then(payload=>{
                cy.request({
                    method : 'PUT',
                    url : 'https://petstore.swagger.io/v2/pet',
                    headers : {
                        'accept' : "application/json",
                        'Content-Type' : "application/json"
                    },
                    body : {
                        "id": ID ,
                        "category": {
                            "id": payload.categoryId,
                            "name": payload.categoryName
                        },
                        "name": payload.petName,
                        "photoUrls": payload.photoUrls,
                        "tags": [
                            {
                            "id": payload.tagsId,
                            "name": payload.tagsName
                            }
                        ],
                        "status": payload.statusPet
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('id', ID)
                    expect(res.body.category).has.property('id', payload.categoryId)
                    expect(res.body.category).has.property('name', payload.categoryName)
                    expect(res.body).has.property('name', payload.petName)
                    expect(res.body.photoUrls).to.deep.eq((payload.photoUrls))
                    for(var i = 0 ; i < res.body.tags.length ; i++){
                        expect(res.body.tags[i]).has.property('id', payload.tagsId)
                        expect(res.body.tags[i]).has.property('name', payload.tagsName)
                    }
                    //show response log
                    cy.log(JSON.stringify(res.body))
                })
            //DELETE
            }).then((res)=>{
                const ID = res.body.id
                cy.log("DELETE PET")
                cy.request({
                    method : 'DELETE',
                    url : 'https://petstore.swagger.io/v2/pet/' + ID,
                    headers : {
                        'accept' : "application/json",
                        'api_key' : "123asd"
                    }
                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body).has.property('code', 200)
                    expect(res.body).has.property('type', 'unknown')
                    expect(res.body).has.property(('message'), String(ID))
                    //show response log
                    cy.log(JSON.stringify(res.body))
                })
            })

            })
        })


    })
})


    //find pet by Id
    // it('Find Pet by ID', ()=>{
    //     cy.fixture('dataPet').then((payload)=>{
    //         cy.request({
    //             method : 'GET',
    //             url : 'https://petstore.swagger.io/v2/pet/' + payload.petId,
    //             headers : {
    //                 'accept' : "application/json"
    //             }
    //         }).then((res)=>{
    //             expect(res.status).to.eq(200)
    //             expect(res.body).has.property('id', payload.petId)
    //             //show response log
    //             cy.log(JSON.stringify(res.body))
    //         })
    //     })
    // })
