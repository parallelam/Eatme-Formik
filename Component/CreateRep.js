import * as React from 'react';

import {
  Formik,
  Form,
  Field,
} from 'formik';

import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Button,
  Grid
} from "@material-ui/core";

import Container from '@material-ui/core/Container'
const useStyles = (theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    backgroundColor: "white"
  },
})

export const CreateRep: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <Container fixed>
        <Formik
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          <Form action="/api/recipe/saveRecipe" method="POST">
            <Grid container>
                <Grid item sm={3}><label>Name</label></Grid>
                <Grid item sm={9}><Field id="name" name="name" placeholder="Name" /></Grid>
                <Grid item sm={3}><label>Serving Size</label></Grid>
                <Grid item sm={9}><Field id="size" name="size" placeholder="Add Serving Size" /></Grid>
                <Grid item sm={3}><label>Directions</label></Grid>
                <Grid item sm={9}><Field id="directions" name="directions" placeholder="Directions" /></Grid>
                <Grid item sm={3}><label>Image</label></Grid>
                <Grid item sm={9}><Field id="image" name="image" placeholder="Image" /></Grid>
                <Grid item sm={3}><label>How long does it take to prep?</label></Grid>
                <Grid item sm={9}><Field id="prep_time" name="prep_time" placeholder="How long does it take to prep?" /></Grid>
                <Grid item sm={3}><label>How long does it take to cook?</label></Grid>
                <Grid item sm={9}><Field id="take_time" name="take_time" placeholder="How long does it take to cook?" /></Grid>
                <Grid item sm={3}><label>Add a story or additional information</label></Grid>
                <Grid item sm={9}><Field id="additional_information" name="additional_information" placeholder="Additional information" /></Grid>
                <Grid item sm={12}><Button className="btn right center-btn" type="submit" color="primary">Submit</Button></Grid>
            </Grid>
          </Form>
        </Formik>
      </Container>
    </React.Fragment>
  );
};

export default CreateRep;