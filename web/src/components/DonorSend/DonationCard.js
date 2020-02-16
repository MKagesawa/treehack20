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

export default function DonationCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          height="250"
          title="QR Code"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Your QR Code
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          We’re here to provide assurance and quality insight in where your packages are going. For tracking, 
          you will need to print out a unique, security generated one-time QR code and visibly attach it to your packages.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Print
        </Button>
      </CardActions>
    </Card>
  );
}
