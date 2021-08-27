# Latent Organism (Creartathon 2021)

This work proposes a process of co-creation between the human and the machine through a balanced interaction and a way of appropriating what we could call an artificial imagination. 

For this experiment, the machine was fed thousands of photos of living organisms. Its property of learning and generalization allows it to converge towards an abstract conception of the idea of organic flesh. It is then possible to navigate in this continuous space of potentiality.   

The spectators is in control, using the imagination of the machine as clay, as a moldable material. Our sympoietic machine takes the physiological data from the spectator as inputs and then translates it into a generative shape and texture using the latent space of a 3D GAN (Generative Adversarial Network). The human is actively participating in the process since he can manipulate, twist, rotate the physical object to transform the shape.

As an incarnation of how humankind continues to externalize itself through technology, this installation relies on technique not only as a collection of tools, but also as an epiphylogenetic memory [Stiegler].

## Link Node.js and Arduino

Before we setup the Node.js server we need to know the name of the serialport your Arduino is attached to. You can find the name of your serialport, it will look something like `/dev/tty.usbmodem142401`. On a Mac using the Terminal and entering the following command:

```
ls /dev/{tty,cu}.*
```

On a PC you can use the command line and the following command:

```
chgport
```
Modify the port in app.js → var port = new SerialPort() function

## Launch Application

1. Install nodejs with npm
2. Using the Terminal start your Node.js app using `node app.js`.
3. Open up a browser and enter the URL `http://localhost:3000/`.


