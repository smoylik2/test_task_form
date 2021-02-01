Test task for create registration form with validation.

LIVE version: http://smoylik2.github.io/test_task_form

Created with CRA, Formik and Yup, scss/sass.

Validation function:
  - all fields must be filled in
  - "name" has only letters, - and spaces
  - "email" matches email templates
  - "phone number" has strict 11 digits or plus at the beginning of line or `-,),(`
  - "language" must be chosen
  - user should agree with "user agreement"
  - if all fields is valid, push registration button and you can see tabel with inputted data
