import { Meteor } from 'meteor/meteor';
import { Interests } from '../../api/interests/Interests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { ClubsInterests } from '../../api/clubs/ClubsInterests';

/** Define a publication to publish all interests. */
Meteor.publish(Interests.userPublicationName, () => Interests.collection.find());

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesInterests.userPublicationName, () => ProfilesInterests.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(ProfilesProjects.userPublicationName, () => ProfilesProjects.collection.find());

/** Define a publication to publish all projects. */
Meteor.publish(Projects.userPublicationName, () => Projects.collection.find());

/** Define a publication to publish this collection. */
if (ClubsInterests && ClubsInterests.userPublicationName && ClubsInterests.collection) {
  Meteor.publish(ClubsInterests.userPublicationName, () => ClubsInterests.collection.find());
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
