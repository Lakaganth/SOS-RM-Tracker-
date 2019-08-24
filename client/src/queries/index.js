import gql from "graphql-tag";

export const GET_CURRENT_RM = gql`
  query {
    getcurrentRM {
      rmanager_name
      rmanager_email
      rmanager_password
    }
  }
`;

export const GET_ALL_RM = gql`
  query {
    getAllRM {
      _id
      rmanager_name
      rmanager_email
    }
  }
`;
export const GET_ALL_LOCATIONS = gql`
  query {
    getAllLocation {
      location_name
      location_code
      location_area
      _id
      rmanager {
        rmanager_name
        rmanager_email
      }
    }
  }
`;

export const GET_ALL_COACHES = gql`
  query {
    getAllCoaches {
      _id
      coach_code
      coach_name
      sport {
        sport_name
        sport_code
      }
    }
  }
`;

export const GET_CURRENTRM_DASHBOARD = gql`
  query($RMemail: EmailAddress!) {
    getCurrentRMDashboard(RMemail: $RMemail) {
      rmanager {
        rmanager_name
        rmanager_email
      }
      rmanager_location {
        _id
        location_name
        location_area
        sport {
          _id
          sport_name
        }
      }
    }
  }
`;

export const GET_CLASS_FOR_LOCATION_SPORT = gql`
  query getClasstimeforLocationSport($sportID: ID!, $locID: ID!) {
    getClasstimeforLocationSport(sportID: $sportID, locID: $locID) {
      _id
      coach_class
      coach_class_end
      day_pattern
      location {
        _id
      }
      sport {
        _id
      }
      coach {
        _id
        coach_name
      }
    }
  }
`;

export const GET_ALL_CLASSES_FOR_CURRENT_RM = gql`
  query getAllClassesForCurrentRM($RMemail: EmailAddress!) {
    getAllClassesForCurrentRM(RMemail: $RMemail) {
      _id
      coach_class
      coach_class_end
      coach {
        _id
        coach_name
      }

      sport {
        _id
        sport_name
      }
      location {
        location_name
        location_area
      }
    }
  }
`;

export const GET_CURRENT_COACH = gql`
  query getCurrentCoach($id: ID!) {
    getCurrentCoach(id: $id) {
      _id
      coach_code
      coach_name
      backup_coach
      coach_email
    }
  }
`;

export const SIGNUP_RMANAGER = gql`
  mutation signupRM(
    $rmanager_name: String!
    $rmanager_email: EmailAddress!
    $rmanager_password: String!
  ) {
    signupRM(
      signupRMInput: {
        rmanager_name: $rmanager_name
        rmanager_email: $rmanager_email
        rmanager_password: $rmanager_password
      }
    ) {
      token
    }
  }
`;

export const SIGNIN_RMANAGER = gql`
  mutation signinRM(
    $rmanager_email: EmailAddress!
    $rmanager_password: String!
  ) {
    signinRM(
      signinRMInput: {
        rmanager_email: $rmanager_email
        rmanager_password: $rmanager_password
      }
    ) {
      token
    }
  }
`;

export const ADD_NEW_REPORT = gql`
  mutation addReport(
    $class_start_time: DateTime!
    $class_end_time: DateTime!
    $coach_arrival_time: DateTime!
    $students_enrolled: Int!
    $students_present: Int!
    $students_unpaid: Int!
    $feedback_severity: String!
    $feedback: String
    $classTimeID: ID!
  ) {
    addReport(
      reportInput: {
        class_start_time: $class_start_time
        class_end_time: $class_end_time
        coach_arrival_time: $coach_arrival_time
        students_enrolled: $students_enrolled
        students_present: $students_present
        students_unpaid: $students_unpaid
        feedback_severity: $feedback_severity
        feedback: $feedback
        classTimeID: $classTimeID
      }
    ) {
      class_start_time
      class_end_time
      coach_arrival_time
      class_duration
      feedback
      students_unpaid
      students_enrolled
      students_present

      feedback_severity
    }
  }
`;

export const ADMIN_ADD_NEW_LOCATION = gql`
  mutation createNewLocation(
    $location_name: String!
    $location_code: String!
    $location_area: String!
    $location_rmanager_email: EmailAddress!
    $location_rmanager_name: String!
  ) {
    createNewLocation(
      newLocationInput: {
        location_name: $location_name
        location_code: $location_code
        location_area: $location_area
        location_rmanager_email: $location_rmanager_email
        location_rmanager_name: $location_rmanager_name
      }
    ) {
      _id
      location_name
      location_code
      location_area
      rmanager {
        _id
      }
    }
  }
`;

export const ADD_NEW_COACH_TO_LOCATION = gql`
  mutation coachToLocationInput(
    $coach_code: String!
    $coach_name: String!
    $coach_email: EmailAddress!
    $backup_coach: String
    $coach_sport: String!
    $location_name: String!
    $sport_code: String!
  ) {
    addCoachToLocation(
      coachToLocationInput: {
        coach_code: $coach_code
        coach_name: $coach_name
        coach_email: $coach_email
        coach_sport: $coach_sport
        sport_code: $sport_code
        location_name: $location_name
        backup_coach: $backup_coach
      }
    ) {
      _id
      location_name
      location_code
      location_area
    }
  }
`;

export const ADD_NEW_CLASS_TO_COACH = gql`
  mutation addClassToCoach(
    $coach_name: String!
    $coach_class: String!
    $coach_class_end: String!
    $location_name: String!
    $day_pattern: String!
  ) {
    addClassToCoach(
      addClassInput: {
        coach_name: $coach_name
        coach_class: $coach_class
        coach_class_end: $coach_class_end
        location_name: $location_name
        day_pattern: $day_pattern
      }
    ) {
      _id
      coach_class
      coach_class_end
      day_pattern
    }
  }
`;

export const DELETE_LOCATION_CARD = gql`
  mutation deleteLocation($lID: ID!) {
    deleteLocation(lID: $lID)
  }
`;

export const DELETE_COACH_CARD = gql`
  mutation deleteCoach($cID: ID!) {
    deleteCoach(cID: $cID)
  }
`;

export const UPDATE_COACH = gql`
  mutation updateCoach(
    $id: ID!
    $coach_code: String!
    $coach_name: String!
    $coach_email: EmailAddress!
    $backup_coach: String
  ) {
    updateCoach(
      id: $id
      updatedCoachInput: {
        coach_code: $coach_code
        coach_name: $coach_name
        coach_email: $coach_email
        backup_coach: $backup_coach
      }
    ) {
      _id
      coach_code
      coach_name
      backup_coach
    }
  }
`;
