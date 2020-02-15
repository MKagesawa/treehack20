from peewee import *

# config - aside from our database, the rest is for use by Flask
DATABASE = 'treehacks.db'

# create a peewee database instance -- our models will use this database to
# persist information
database = SqliteDatabase(DATABASE)

# model definitions -- the standard "pattern" is to define a base model class
# that specifies which database to use.  then, any subclasses will automatically
# use the correct storage. for more information, see:
# http://charlesleifer.com/docs/peewee/peewee/models.html#model-api-smells-like-django
class BaseModel(Model):
    class Meta:
        database = database

# the user model specifies its fields (or columns) declaratively, like django
class User(BaseModel):
    email = CharField(unique=True)
    password = CharField()
    donor = BooleanField()

# a dead simple one-to-many relationship: one user has 0..n messages, exposed by
# the foreign key.  because we didn't specify, a users messages will be accessible
# as a special attribute, User.message_set
class Request(BaseModel):
    user = ForeignKeyField(User, backref='requests')
    content = TextField()
    date = DateTimeField()
    geolat = FloatField()
    geolng = FloatField()
    fulfilled_by = ForeignKeyField(User, null=True)
    received_by = ForeignKeyField(User, null=True)

# simple utility function to create tables
def create_tables():
    with database:
        database.create_tables([User, Request])

def gen_data():
    User.create(email="1@g.com", password="abc", donor=True)
    User.create(email="2@g.com", password="abc", donor=False)

    Request.create(user="2@g.com", content="abc", date=123, geolat=10,
        geolng=10, fulfilled_by=None, received_by=None)
