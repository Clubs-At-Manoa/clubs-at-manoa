import { Meteor } from 'meteor/meteor';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';
import { ProjectsInterests } from '../../api/clubs/ClubsInterests';

/** Define a publication to publish all interests. */
if (Interests && Interests.userPublicationName && Interests.collection) {
  Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());
} else {
  console.error('Error publishing Interests: missing data');
}

/** Define a publication to publish all profiles. */
if (Profiles && Profiles.userPublicationName && Profiles.collection) {
  Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());
} else {
  console.error('Error publishing Profiles: missing data');
}

/** Define a publication to publish this collection. */
if (ProfilesInterests && ProfilesInterests.userPublicationName && ProfilesInterests.collection) {
  Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());
} else {
  console.error('Error publishing ProfilesInterests: missing data');
}

/** Define a publication to publish this collection. */
if (ProfilesClubs && ProfilesClubs.userPublicationName && ProfilesClubs.collection) {
  Meteor.publish(ProfilesClubs.userPublicationName, () => ProfilesClubs.collection.find());
} else {
  console.error('Error publishing ProfilesClubs: missing data');
}

/** Define a publication to publish all projects. */
if (Clubs && Clubs.userPublicationName && Clubs.collection) {
  Meteor.publish(Clubs.userPublicationName, () => Clubs.collection.find());
} else {
  console.error('Error publishing Clubs: missing data');
}

/** Define a publication to publish this collection. */
if (ProjectsInterests && ProjectsInterests.userPublicationName && ProjectsInterests.collection) {
  Meteor.publish(ProjectsInterests.userPublicationName, () => ProjectsInterests.collection.find());
} else {
  console.error('Error publishing ProjectsInterests: missing data');
}

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
