const { gql } = require("apollo-server");

module.exports = gql`
  scalar Date
  scalar Time
  scalar DateTime
  scalar EmailAddress

  input updatedCoachInputData {
    coach_code: String!
    coach_name: String!
    coach_email: EmailAddress!
    backup_coach: String
  }

  input reportInputData {
    class_start_time: DateTime!
    class_end_time: DateTime!
    coach_arrival_time: DateTime!
    students_enrolled: Int!
    students_present: Int!
    students_unpaid: Int!
    feedback_severity: String!
    feedback: String
    classTimeID: ID!
  }

  input RMSigninInputData {
    rmanager_email: EmailAddress!
    rmanager_password: String!
  }

  input RMSignupInputData {
    rmanager_name: String!
    rmanager_email: EmailAddress!
    rmanager_password: String!
  }

  input addClassInputData {
    coach_name: String!
    coach_class: String!
    coach_class_end: String!
    day_pattern: String!
    location_name: String!
  }

  input coachToLocationInputData {
    coach_code: String!
    coach_name: String!
    coach_email: EmailAddress!
    backup_coach: String
    coach_sport: String!
    location_name: String!
    sport_code: String!
  }
  input newLocationInputData {
    location_name: String!
    location_code: String!
    location_area: String!
    location_rmanager_email: EmailAddress!
    location_rmanager_name: String!
  }
  input newCoachInputData {
    coach_code: String!
    coach_name: String!
    coach_email: EmailAddress!
    backup_coach: String
    coach_sport: String!
  }

  input NewRManagerInputData {
    rmanager_name: String!
    rmanager_email: EmailAddress!
    location_name: String
    location_area: String
  }

  type ReportFeed {
    cursor: ID
    reports: [Report]
  }

  type Report {
    _id: ID!
    class_start_time: DateTime!
    class_end_time: DateTime!
    coach_arrival_time: DateTime!
    class_duration: String!
    students_enrolled: Int!
    students_present: Int!
    students_unpaid: Int!
    feedback_severity: String!
    feedback: String
    coach: Coach
    sport: Sport
    location: Location
    rmanager: [RManager]
  }

  type rManagerWithLocation {
    rmanager: RManager
    rmanager_location: [Location]
  }

  type Token {
    token: String!
  }

  type ClassTime {
    _id: ID!
    coach_class: String!
    coach_class_end: String!
    day_pattern: String!
    coach: Coach
    sport: Sport
    location: Location
    rmanager: [RManager]
  }

  type Coach {
    _id: ID!
    coach_code: String!
    coach_name: String!
    coach_email: EmailAddress!
    sport: Sport
    rmanager: RManager
    location: Location
    backup_coach: String
    classtime: [ClassTime]
  }

  type Sport {
    _id: ID!
    sport_code: String!
    sport_name: String!
    rmanager: [RManager]
    location: [Location]
    classtime: [ClassTime]
  }

  type Location {
    _id: ID!
    location_name: String!
    location_code: String!
    location_area: String!
    rmanager: [RManager]
    coach: [Coach]
    sport: [Sport]
    classtime: [ClassTime]
  }

  type RManager {
    _id: ID!
    rmanager_name: String!
    rmanager_email: EmailAddress!
    rmanager_password: String!
    location: [Location!]!
    coach: [Coach]
    sport: [Sport]
    classtime: [ClassTime]
  }

  type Query {
    getAllClassesForCoach(id: ID!): [ClassTime]
    getcurrentRM: RManager
    getAllRM: [RManager!]!
    getAllLocation: [Location!]!
    getAllCoaches: [Coach!]!
    getCurrentCoach(id: ID!): Coach!
    getCurrentRMDashboard(RMemail: EmailAddress!): rManagerWithLocation!
    getClasstimeforLocationSport(sportID: ID!, locID: ID!): [ClassTime]
    getAllClassesForCurrentRM(RMemail: EmailAddress!): [ClassTime]
    getAllLocationsForCoach(coachID: ID!): [Location!]!
    getAllReportsForCoachLocation(coachID: ID!, locID: ID!): [Report!]!
    getReportsFeed(cursor: ID): ReportFeed
  }

  type Mutation {
    createNewRManager(newRManagerInput: NewRManagerInputData!): RManager!
    createNewLocation(newLocationInput: newLocationInputData!): Location!
    addLocationToRM(locName: String!, rmEmail: EmailAddress!): Location!
    createCoach(newCoachInput: newCoachInputData!): Coach!
    addCoachToLocation(
      coachToLocationInput: coachToLocationInputData!
    ): Location!
    addClassToCoach(addClassInput: addClassInputData!): ClassTime!
    signupRM(signupRMInput: RMSignupInputData!): Token
    signinRM(signinRMInput: RMSigninInputData!): Token
    addReport(reportInput: reportInputData!): Report

    updateCoach(id: ID!, updatedCoachInput: updatedCoachInputData!): Coach!
    deleteCoach(cID: ID!): Boolean!
    deleteLocation(lID: ID!): Boolean!
    deleteSport(sID: ID!): Boolean!
    deleteRmanager(rmID: ID!): Boolean!
    deleteClassTime(ctID: ID!): Boolean!
    deleteAll: Boolean!
  }
`;
