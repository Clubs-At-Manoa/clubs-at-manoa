import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Clubs } from '../../api/clubs/Clubs';
import { ClubsInterests } from '../../api/clubs/ClubsInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Interests } from '../../api/interests/Interests';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Define an interest.  Has no effect if interest already exists. */
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, title, interests, projects, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, title, picture, email });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  projects.map(project => ProfilesClubs.collection.insert({ profile: email, project }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Define a new club. Error if club already exists. */
function addClub({ name, approvedDate, expirationDate, clubType, purpose, clubManager, contact, interests }) {
  console.log(`Defining club ${name}`);
  Clubs.collection.insert({ name, approvedDate, expirationDate, clubType, purpose, clubManager, contact, interests });
  interests.forEach(interest => ClubsInterests.collection.insert({ project: name, interest }));
  interests.forEach(interest => addInterest(interest));
}

Meteor.startup(() => {
  // Optional: Clear the database on startup
  if (Meteor.settings.resetDB) {
    console.log('Resetting database...');
    Profiles.collection.remove({});
    ProfilesClubs.collection.remove({});
    ProfilesInterests.collection.remove({});
    Clubs.collection.remove({});
    ClubsInterests.collection.remove({});
    Interests.collection.remove({});
  }

  if (Meteor.users.find().count() === 0) {
    console.log('Initializing default data...');
    Meteor.settings.defaultProfiles?.forEach(addProfile);
    Meteor.settings.defaultClubs?.forEach(addClub);
  }

  // Load data from a private file if specified
  if (Meteor.settings.loadAssetsFile && Meteor.users.find().count() < 7) {
    const assetsFileName = 'data.json';
    console.log(`Loading data from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.profiles.forEach(addProfile);
    jsonData.clubs.forEach(addClub);
  }
});
