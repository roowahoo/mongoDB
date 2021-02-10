// Create new database
// Go ahead to use the database as if it exist
'use animal_shelter'


// Mongo will automatically save the new database when 
// -it has at least one collection
// -and that collection has at least one document

// Insert into a collection
// db.<collection name>.insert

db.animals.insert({
    'name':'Fluffy',
    'age':3,
    'breed':'Golden Retreiver',
    'species':'dog'
})

// Once done with this step and database has not been saved, it will be saved.

// Inserting many into document
db.animals.insertMany([
    {
        'name':'Muffin',
        'age':10,
        'breed':'Orange tabby'
    },
    {
        'name':'Charles',
        'age':5,
        'breed':'Husky'
    }
])

// hands-on answers

db.students.insertMany([
    {
        'name': 'Jane Doe',
        'age':13,
        'subjects': ['Defense Against the Dark Arts', 'Charms', 'History of Magic'],
        'date_enrolled':new Date('2016-05-13')

    },
    {
        'name':'James Verses',
        'age':14,
        'subjects':['Transfiguration', 'Alchemy'],
        'date_enrolled':new Date('2015-06-15')
    },
    {
        'name':'Jonathan Goh',
        'age':12,
        'subjects':['Divination', 'Study of Ancient Runes'],
        'date_enrolled':new Date('2017-04-16')
    }
])

// update an existing document
// update by project id
// Prestige method aka PUT(replaces entire document but retain identity by keeping the old id)
db.students.update({
    '_id':ObjectId("602349fc12d98882074bcdfb")
},{
    'name':'James Verses',
    'age':15,
    'subjects':['Transfiguration', 'Alchemy'],
    'date_enrolled':new Date('2015-06-15')
})

// Patch method(updates one or more keys of existing document)
db.students.update({
    '_id':ObjectId("602349fc12d98882074bcdfb")
},{
    '$set':{
        'age':16
    }
})

// update many

db.students.updateMany({
    'age':{
        '$gte':13
    }
},{
    '$set':{
        'fyp':true
    }
})

// Delete
db.students.remove({
    '_id':ObjectId("602349fc12d98882074bcdfc")
})

// manage sub-documents
db.animals.insert({
    'name':'Jay',
    'age':1,
    'breed':'beagle',
    'species':'Dog',
    'tags':[
        'playful','toilet-trained','good with cats'
    ]
})

// push to back of tags array for Jay the beagle
db.animals.update({
    '_id':ObjectId('602371e112d98882074bce03'),

},{
    '$push':{
        'tags':'good with kids'
    }
})

// pull(remove) 'good with cats' from tags array for Jay
db.animals.update({
    '_id':ObjectId('602371e112d98882074bce03')
},{
    '$pull':{
        'tags':'good with cats'
    }
})

// adding sub-documents
db.animals.update({
    '_id':ObjectId('602371e112d98882074bce03')
},{
    '$set':{
        'vet':{
            'name':'Dr Linda Khoo',
            'contact':55453689,
            'address':'Sunset Way Blk 3'
        }
    }
})

// update Dr Linda Khoo to Dr Linda Tan
db.animals.update({
    '_id':ObjectId('602371e112d98882074bce03')
},{
    '$set':{
        'vet.name':'Dr Linda Tan'
    }
})

// update specific object
// assume Jay has a list of check-ups attended
db.animals.update({
    '_id':ObjectId('1234dog_id')
},{
    '$set':{
        'checkups':[
            {
                '_id':ObjectId(new_checkup_id),
                'diagnosis':'Inflammation',
                'treatment':'Anti-Inflammatory'
            },
            {
                '_id':ObjectId(new_checkup_id),
                'diagnosis':'Separation  Anxiety',
                'treatment':'Lots of treats when leaving house'
            }
        ]
    }
})

db.animals.update({
    'checkups':{
        '$elemMatch':{
            '_id':ObjectId('1234checkup_id_not_dog_id')
        }
    }
},{
    '$set':{
        'checkups.$.diagnosis':'Seperation Anxiety',
        'checkups.$.treatment':'Lots of love'
    }

})

// hands-on answers
db.animals.insertMany([{
    'name':'Jordan',
    'age':15,
    'breed':'Golden Retreiver',
    'species':'Dog'
},
{
    'name':'Dash',
    'age':3,
    'breed':'Hamster',
    'species':'Hamster'
},
{
    'name':'Carrot',
    'age':1.5,
    'breed':'Australian Dwarf',
    'species':'Rabbit'
}])

db.animals.update({
    '_id':ObjectId('602375a812d98882074bce06')
},{
    '$set':{
        'age':2.5
    }
})

db.animals.update({
    '_id':ObjectId('602375a812d98882074bce05')
},{
    'name':'Dash',
    'age':4.5,
    'breed':'Winter White',
    'species':'Hamster'
})

db.animals.remove({
    '_id':ObjectId('602375a812d98882074bce04')
})