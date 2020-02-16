import styles from "./DonorSend.module.css";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function DonationCardThree() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          height="250"
          title="QR Code"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          3. Check back for real-time updates on package delivery, as well as how much of the contents were received.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
