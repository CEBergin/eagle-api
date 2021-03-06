const factory = require('factory-girl').factory;
const moment = require('moment');
const _ = require('lodash');
const factory_helper = require('./factory_helper');
const Organization = require('../../helpers/models/organization');
let faker = require('faker/locale/en');

const factoryName = Organization.modelName;

const companyTypes = [
  "Consultant"
  , "Indigenous Group"
  , "Local Government"
  , "Ministry"
  , "Municipality"
  , "Other Agency"
  , "Other Government"
  , "Proponent/Certificate Holder"
];

factory.define(factoryName, Organization, buildOptions => {
  if (buildOptions.faker) faker = buildOptions.faker;
  factory_helper.faker = faker;

  let author = factory_helper.generateFakePerson();
  let updator = faker.random.arrayElement([null, author, factory_helper.generateFakePerson()]);

  let dateUpdated = moment(faker.date.past(10, new Date()));
  let dateAdded = dateUpdated.clone().subtract(faker.random.number(45), 'days');
  let companyName = faker.company.companyName();
  if (_.isEmpty(updator)) dateUpdated = null;

  let attrs = {
      _id              : factory_helper.ObjectId()
    , addedBy          : author.idir
    , description      : faker.lorem.paragraph()
    , name             : companyName
    , updatedBy        : (_.isEmpty(updator)) ? null : updator.idir
    , dateAdded        : dateAdded
    , dateUpdated      : dateUpdated
    , country          : "Canada"
    , postal           : factory_helper.generateFakePostal()
    , province         : "BC"
    , city             : faker.random.arrayElement(factory_helper.getBcCities())
    , address1         : faker.address.streetAddress()
    , address2         : faker.address.secondaryAddress()
    , companyType      : faker.random.arrayElement(companyTypes)
    , parentCompany    : factory_helper.ObjectId()
    , companyLegal     : ""
    , company          : companyName

    , read             : faker.random.arrayElement([["public"], ["sysadmin"], ["public", "sysadmin"]])
    , write            : faker.random.arrayElement([["public"], ["sysadmin"], ["public", "sysadmin"]])
    , delete           : faker.random.arrayElement([["public"], ["sysadmin"], ["public", "sysadmin"]])
  };
  return attrs;
});

exports.factory = factory;
exports.name = factoryName;
