// see all databses associated with the user
show databases
// to select a specific database
use sample_airbnb
// **if you use a database whose name does not exist, mongo will assume you want to create a new database.Therefore,show collections first.
// see collections in a database
show collections
// check currently selected database
db
// find (all) documents from a collection
db.listingsAndReviews.find()
// find a specific number of documents from a collection
db.listingsAndReviews.find().limit(10)
// format the output nicely
db.listingsAndReviews.find().pretty().limit(10)

// Projecting(show only certain keys from the documents)
// show name, summary and address keys
db.listingsAndReviews.find({},{
    'name':1,
    'summary':1,
    'address':1,
}).pretty()


// Projecting a sub-document (i.e objects)
db.listingsAndReviews.find({},{
    'name':1,
    'summary':1,
    'address.street':1,
    'address.country':1
}).pretty()

// Searching for documents by criteria
db.listingsAndReviews.find({
    'beds':2
},{
    'name':1,'address':1,'beds':1
}).pretty()

// find all listings that have exactly 2 bedrooms and 2 beds
db.listingsAndReviews.find({
    'beds':2,
    'bedrooms':2
},{
    'name':1,
    'address.country':1,
    'beds':1,
    'bedrooms':1
}).pretty()

// find by country
db.listingsAndReviews.find({
    'address.country':'Brazil'
},{
    'name':1,
    'address.country':1,
    'beds':1,
    'bedrooms':1

}).pretty()

// add .count to find number of listings

// find listings with 2 beds, 2 bedrooms, and in brazil
db.listingsAndReviews.find({
    'address.country':'Brazil',
    'beds':2,
    'bedrooms':2
},{
    'name':1,
    'address.country':1,
    'beds':1,
    'bedrooms':1
})

// Inequality

// gt is greater than
db.listingsAndReviews.find({
    'beds':{
        '$gt':3
    }
},{'name':1,'beds':1})

// gte is greater than and equal to
db.listingsAndReviews.find({
    'beds':{
        '$gte':3
    }
},{'name':1,'beds':1})

// lesser than 6
db.listingsAndReviews.find({
    'beds':{
        '$lt':6
    }
},{'name':1,'beds':1})

// between 3 and 6 beds
db.listingsAndReviews.find({
    'beds':{
        '$gte':3,
        '$lte':6
    }
},{'name':1,'beds':1})

// {} first curly braces is called criteria second {} is projection


// Hands-on answers
db.companies.find({
    'founded_year':2006
},{'name':1,'founded_year':1})

db.companies.find({
    'founded_year':{
        '$gt':2000
    }
},{'name':1,'founded_year':1})

db.companies.find({
    'founded_year':{
        '$gt':1900,
        '$lt':2010
    }
},{'name':1,'founded_year':1})

db.companies.find({
    'ipo.valuation_amount':{
        '$gt':100000000}

},{'name':1,'ipo.valuation_amount':1,})

db.companies.find({
    'ipo.valuation_amount':{
        '$gt':100000000},
    'ipo.valuation_currency_code':'USD'

},{'name':1,'ipo.valuation_amount':1, 'ipo.valuation_currency_code':1})

db.listingsAndReviews.find({
    'amenities':'Pets allowed'
},{
    'name':1,'amenities':1
}).pretty()

// find all listings that have  BOTH pets allowed

db.listingsAndReviews.find({
    'amenities':{
        '$all':['Pets allowed', 'Pets live on this property']
    }
},{'name':1,'amenities':1}).pretty()

// find all listings that have wifi OR internet
db.listingsAndReviews.find({
    'amenities':{
        '$in':['Wifi','Internet']
    }
},{'name':1,'amenities':1}).pretty()

// find all listings that have been reviewed by reviewer id 6184569
db.listingsAndReviews.find({
    'reviews':{
        '$elemMatch':{
            'reviewer_id':'6184569'
        }
    }},{
        'name':1,'reviews':{
        '$elemMatch':{
            'reviewer_id':'6184569'
    }}}).limit(5).pretty()

    // Hands on answers
    db.accounts.find({
        'products':{
            '$all':['InvestmentStock']
        }
    },{
        'account_id':1,'products':1
    })

     db.accounts.find({
        'products':{
            '$all':['InvestmentStock','Commodity']
        }
    },{
        'account_id':1,'products':1
    })

   db.accounts.find({
        'products':{
            '$in':['Commodity','CurrencyService']
        }
    },{
        'account_id':1,'products':1
    })
    
    db.accounts.find({
        'products':{
            '$ne':'CurrencyService'
        }
    },{
        'account_id':1,'products':1
    })

    // $ne only excludes one Element. $nin excludes more than 1
    db.accounts.find({
        'products':{
            '$nin':['CurrencyService','Commodity']
        }
    },{
        'account_id':1,'products':1
    })
    
    db.accounts.find({
        'products':{
            '$all':['InvestmentStock','InvestmentFund']
        },
        'limit':{
            '$gt':1000

        }
    },{
        'account_id':1,'products':1,'limit':1
    })

    // Compounds criteria
    // find all listings in brazil or canada
    db.listingsAndReviews.find({
        '$or':[
            {'address.country':'Brazil'},
            {'address.country':'Canada'}
        ]
    },{'name':1,'address.country':1}).pretty()

    // find listings in Brazil or CanvasGradient,but if from Brazil, must have >4 beds
    db.listingsAndReviews.find({
        '$or':[
            {'address.country':'Brazil',
        'beds':{
            '$gt':4
        }},
        {'address.country':'Canada'}
        ]
    },{'name':1,'address.country':1, 'beds':1})

    db.listingsAndReviews.find({
        '$and':[
            {'beds':{
                '$gt':4
            }},
            {'$or':{
                'address.country':'Brazil'
            }}
        ]
    },{})

    