import { Device } from './device.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DeviceListService {

    constructor() { }

    getListDevices(): Promise<Device[]> {
        let p: Promise<Device[]> = new Promise(
            (resolve: (res: Device[]) => void,
                reject: (res: string) => void) => {

                // Verifica se tem suporte a devices list
                if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                    console.error("enumerateDevices() not supported.");

                    reject("enumerateDevices() not supported.");
                }

                let devicesReturn: Device[] = [];
                let counter = 0;

                navigator.mediaDevices.enumerateDevices()
                    .then(function(devices) {
                        devices.forEach(function(device) {

                            if (device.kind === "videoinput") {
                                counter++;

                                let label = device.label ? device.label : "camera " + counter;

                                devicesReturn.push(new Device(device.deviceId, label, device.kind));
                            }
                        });

                        resolve(devicesReturn);
                    })
                    .catch(function(err) {
                        console.error(err.name + ": " + err.message);
                        reject(err.name + ": " + err.message);
                    });
            }
        );
        return p;
    }
}
