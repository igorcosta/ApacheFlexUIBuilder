# Apache Flex UI Builder

#### Creating Flex UI with drag and drop, easy like in Flash Builder

![alt text](https://github.com/igorcosta/ApacheFlexUIBuilder/temp/frist-shot.png "Screenshot")


 Apache Flex UI Builder helps you to drag and drop components and also with the power of CodeMirror you
 can write your MXML directly in the browser, with auto complete with limited available
 Inspect properties, scale, change on the fly and generates mxml on every movement.

 After generating mxml, you can copy and paste directly on your IDE and be more productive.

 Since Flash Builder 4.7 doesn't support Design Mode, this project could help fullfill the gap left
 to Flex developers out there.

---
# About Apache Flex

 Apache Flex is a open-source UI SDK that creates compeling and beautiful interfaces for Flash Player platform.
 Using state of art technology and used by Fortune's TOP 500 companies, Flex is the ultimate goal UI technology 
 knwon today, creating not only UI but you can produce native Apps, Desktop Apps and Web Apps coding with MXML and 
 actionscript.

 To know more about the project visit our [official website](http://flex.apache.org)
---
Components that are capable of drag and drop in current release

| Components    |
|---------------|
| Panel         |
| ColorPicker   |
| DataGrid      |
| ComboBox      |
| Application   |
| NumericStepper|
| Label         |
| TextArea      |
| TextInput     |
| Image         |

---
## Questions

### What's main goal?
  Help Apache Flex developers keep up productivity specially the newbie developers arriving in the technology.

### Why not built with Flex?
  I tought on that in first place, but I wanted something more flexible that could build entirely on open technology
  and could run over mobile devices specially iOS devices, and some mockups could be build easly over touch devices
  runing directly into browser. 
  It's hard to generate and transcode DOM elements into MXML, specially for child of N childs. Still pending on that.

### Does you have plan to keep updating project?
  Sure, but I've posted on github in hope of some help of your qualities that could plus the project forward.

## Releases

1.0 - Initial Commit to the entire flex community

## known issues

. Draging a component into design area causes a position to 0x0 for first time
. Scaling using drag controlers and selecting a component causes component to flick and jump.
. Childs drags doesn't work on first release.
. Reflection from source code to Design doesn't work, just design-> code generation.


## I want to Help!

  Please feel totally free to fork, clone and send yours pull requests here. 
  I must be very thankfull for yours kind contributions.

## Author

[Igor Costa](http://www.igorcosta.com)
##### Contact

Find me at Twitter [@igorcosta](http://www.twitter.com/igorcosta)
