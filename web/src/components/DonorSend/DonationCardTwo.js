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

export default function DonationCardTwo() {
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
          2. The verified recipient will scan the code, notifying you that they received the package.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
