# Solar Status

A real time solar system monitor built using the Raspberry Pi.

![Demo image](/images/thumb.png?raw=true "Screenshot")

## What does it do?

Through interfacing with an Epever solar charge controller, Solar Status fetches real time information on the status of a solar system. This includes:

- battery voltage

- battery current

- battery SOC

- the current charge mode (float, boost, equalization)

- PV array current

- PV array voltage

- PV array power

- battery temperature

- ambient temperature (as measured by the controller)

 It is then displayed on a website



## How does it work?

Below is a connection diagram showing the overall schematic of the system.

![Wiring diagram](/images/wiring.png?raw=true "Wiring diagram")

A Node server on the Pi is responsible for communicating with the controller (code for which is in the backend folder). The charge controller uses RS485, meaning we need the transceiver to communicate with it. As for the protocol, any Epever charge controller uses Modbus. To handle this, I wrote a custom modbus library which handles framing the requests as well as computing the CRC (cyclic redundancy check). 

## What hardware was used?

- Raspberry Pi 4
- Epever XTRA-N charge controller (can be swapped with any Epever controller that has a rj45 port)
- Max13487 transceiver (this is primarily because it has ADDC. In the future, I will make any transceiver work using hardware flow control) 
- TXS0108E Level shifter. Any chip based level shifter will work. Ones which use pullup resistors will often be too slow for 115200 baud needed. 
