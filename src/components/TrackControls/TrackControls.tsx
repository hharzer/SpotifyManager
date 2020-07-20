import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  slider: {
    width: 300,
  },
});

interface TrackControlProps {
  onBPMChange: any;
}

const TrackControls = ({ onBPMChange }: TrackControlProps) => {
  const classes = useStyles();

  const [value, setValue] = React.useState<number[]>([0, 220]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 220,
      label: "220",
    },
  ];

  //   function valueLabelFormat(value: number) {
  //     return marks.findIndex((mark) => mark.value === value) + 1;
  //   }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.slider}>
          <Typography id="range-slider" gutterBottom>
            Temperature range
          </Typography>
          <Slider
            value={value}
            onChange={handleChange}
            onChangeCommitted={onBPMChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            //   valueLabelFormat={valueLabelFormat}
            marks={marks}
            max={220}
            // getAriaValueText={valuetext}
          />
        </div>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default TrackControls;