// @generated automatically by Diesel CLI.

diesel::table! {
    my_friend (id) {
        id -> Text,
        name -> Text,
        role_name -> Nullable<Text>,
    }
}
