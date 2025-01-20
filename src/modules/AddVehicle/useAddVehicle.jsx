import { useForm } from '@mantine/form';
import { useCreateVehicleMutation , useUpdateVehicleMutation} from '@/services/vehicle-manage';

export const useAddVehicle = (editData) => {
  console.log("editData>>>>>>>>> make", editData?.make)
  const [createVehicle] = useCreateVehicleMutation()
  const [updateVehicle] = useUpdateVehicleMutation()
  const form = useForm({
    initialValues: {
      // Basic Information
      type: editData?.type || '',
      make: editData?.make || 'Honda',
      model: editData?.model || '',
      variant: editData?.variant || '',
      year: editData?.year || new Date().getFullYear(),
      bodyType: editData?.bodyType || '',

      // General Info
      minPrice: editData?.minPrice || '',
      maxPrice: editData?.maxPrice || '',
      colors: editData?.colors || [],
      releaseDate: editData?.releaseDate || new Date(),
      description: editData?.description || '',
      defaultImage: editData?.defaultImage || null,
      images: editData?.images || [],
      views: editData?.views || 0,
      pros: editData?.pros || [],
      cons: editData?.cons || [],
      faqs: editData?.faqs || [],

      // Bike Specs
      bikeSpecs: {
        engine: {
          type: editData?.engine?.type || '',
          displacement: editData?.engine?.displacement || '',
          horsepower: editData?.engine?.horsepower || '',
          torque: editData?.engine?.torque || '',
          boreStroke: editData?.engine?.boreStroke || '',
          compressionRatio: editData?.engine?.compressionRatio || '',
          clutch: editData?.engine?.clutch || ''  
        },
        transmission: editData?.transmission || '',
        fuelCapacity: editData?.fuelCapacity || '',
        fuelAverage: editData?.fuelAverage || '',
        starting: editData?.starting || '',
        topSpeed: editData?.topSpeed || '',
        dimensions: {
          length: editData?.dimensions?.length || '',
          width: editData?.dimensions?.width || '',
          height: editData?.dimensions?.height || ''
        },
        dryWeight: editData?.dryWeight || '',
        frame: editData?.frame || '',
        groundClearance: editData?.groundClearance || '',
        wheelSize: editData?.wheelSize || '',
        tyres: {
          front: editData?.tyres?.front || '',
          back: editData?.tyres?.back || ''
        },
        colorsAvailable: editData?.colorsAvailable || [],
        suspension: editData?.suspension || '' // Add this field
      },

      // Car Specs
      carSpecs: {
        dimensions: {
          overallLength: editData?.dimensions?.overallLength || '',
          overallWidth: editData?.dimensions?.overallWidth || '',
          overallHeight: editData?.dimensions?.overallHeight || '',
          wheelBase: editData?.dimensions?.wheelBase || '',
          groundClearance: editData?.dimensions?.groundClearance || '',
          kerbWeight: editData?.dimensions?.kerbWeight || '',
          bootSpace: editData?.dimensions?.bootSpace || '',
          seatingCapacity: editData?.dimensions?.seatingCapacity || '',
          doors: editData?.dimensions?.doors || ''
        },
        mileage: {
          city: editData?.mileage?.city || '',
          highway: editData?.mileage?.highway || ''
        },
        engine: {
          type: editData?.engine?.type || '',
          displacement: editData?.engine?.displacement || '',
          horsepower: editData?.engine?.horsepower || '',
          torque: editData?.engine?.torque || '',
          maxSpeed: editData?.engine?.maxSpeed || '',
          cylinderConfiguration: editData?.engine?.cylinderConfiguration || '',
          compressionRatio: editData?.engine?.compressionRatio || '',
          valvesPerCylinder: editData?.engine?.valvesPerCylinder || '',
          valveMechanism: editData?.engine?.valveMechanism || '',
          batteryType: editData?.engine?.batteryType || '',
          batteryCapacity: editData?.engine?.batteryCapacity || '',
          chargingTime: editData?.engine?.chargingTime || '',
          range: editData?.engine?.range || ''
        },
        transmission: {
          type: editData?.transmission?.type || 'Automatic',
          cvt: editData?.transmission?.cvt || false
        },
        suspensionSteeringBrakes: {
          steeringType: editData?.suspensionSteeringBrakes?.steeringType || '',
          powerAssisted: editData?.suspensionSteeringBrakes?.powerAssisted || '',
          minimumTurningRadius: editData?.suspensionSteeringBrakes?.minimumTurningRadius || '',
          frontBrakes: editData?.suspensionSteeringBrakes?.frontBrakes || '',
          rearBrakes: editData?.suspensionSteeringBrakes?.rearBrakes || ''
        },
        wheelsAndTyres: {
          wheelType: editData?.wheelsAndTyres?.wheelType ||  '',
          wheelSize: editData?.wheelsAndTyres?.wheelSize || '',
          tyreSize: editData?.wheelsAndTyres?.tyreSize || '',
          spareTyre: editData?.wheelsAndTyres?.spareTyre || '',
          spareTyreSize: editData?.wheelsAndTyres?.spareTyreSize || ''
        },
        fuelConsumption: {
          mileageCity: editData?.fuelConsumption?.mileageCity || '',
          mileageHighway: editData?.fuelConsumption?.mileageHighway || '',
          tankCapacity: editData?.fuelConsumption?.tankCapacity || ''
        },
        safety: {
          airbags: editData?.safety?.airbags || 0,
          seatBelts: editData?.safety?.seatBelts || 0,
          immobilizer: editData?.safety?.immobilizer || false,
          childLock: editData?.safety?.childLock || false,
          abs: editData?.safety?.abs || false,
          tractionControl: editData?.safety?.tractionControl || false,
          vehicleStabilityControl: editData?.safety?.vehicleStabilityControl || false,
          hillAssist: editData?.safety?.hillAssist || false,
          downHillAssist: editData?.safety?.downHillAssist || false,
          isofixAnchors: editData?.safety?.isofixAnchors || false
        },
        exterior: {
          alloyWheels: editData?.exterior?.alloyWheels || false,
          coloredOutsideDoorHandles: editData?.exterior?.coloredOutsideDoorHandles || false,
          sideMirrorsWithIndicators: editData?.exterior?.sideMirrorsWithIndicators || false,
          rearSpoiler: editData?.exterior?.rearSpoiler || false,
          adjustableHeadlights: editData?.exterior?.adjustableHeadlights || false,
          fogLights: editData?.exterior?.fogLights || false,
          sunRoof: editData?.exterior?.sunRoof || false,
          moonRoof: editData?.exterior?.moonRoof || false,
          colorsAvailable: editData?.exterior?.colorsAvailable || []
        },
        entertainment: {
          tachometer: editData?.entertainment?.tachometer || false,
          multiInfo: editData?.entertainment?.multiInfo || false,
          cdDvdPlayer: editData?.entertainment?.cdDvdPlayer || false,
          usbAndAux: editData?.entertainment?.usbAndAux || false,
          displaySize: editData?.entertainment?.displaySize || '',
          frontSpeakers: editData?.entertainment?.frontSpeakers || false,
          rearSeatEntertainment: editData?.entertainment?.rearSeatEntertainment || false
        },
        comfort: {
          ac: editData?.comfort?.ac || false,
          climateControl: editData?.comfort?.climateControl || false,
          rearAcVents: editData?.comfort?.rearAcVents || false,
          heater: editData?.comfort?.heater || false,
          heatedSeats: editData?.comfort?.heatedSeats || false,
          defogger: editData?.comfort?.defogger || false,
          coolBox: editData?.comfort?.coolBox || false,
          navigation: editData?.comfort?.navigation || false,
          frontCamera: editData?.comfort?.frontCamera || false,
          rearCamera: editData?.comfort?.rearCamera || false,
          rearFoldingSeat: editData?.comfort?.rearFoldingSeat || false,
          rearHeadrest: editData?.comfort?.rearHeadrest || false,
          rearWiper: editData?.comfort?.rearWiper || false,
          seatMaterialType: editData?.comfort?.seatMaterialType || '',
          steeringAdjustment: editData?.comfort?.steeringAdjustment || false,
          steeringSwitches: editData?.comfort?.steeringSwitches || false,
          cruiseControl: editData?.comfort?.cruiseControl || false,
          drivingModes: editData?.comfort?.drivingModes || false,
          keyType: editData?.comfort?.keyType || 'Smart entry',
          keylessEntry: editData?.comfort?.keylessEntry || false,
          pushStart: editData?.comfort?.pushStart || false,
          centralLocking: editData?.comfort?.centralLocking || false,
          powerDoorLocks: editData?.comfort?.powerDoorLocks || false,
          powerSteering: editData?.comfort?.powerSteering || false,
          powerWindows: editData?.comfort?.powerWindows || false,
          powerMirrors: editData?.comfort?.powerMirrors || false,
          cupHolders: editData?.comfort?.cupHolders || false,
          armRest: editData?.comfort?.armRest || false,
          handbrake: editData?.comfort?.handbrake || 'Center Lever',
          interiorLighting: editData?.comfort?.interiorLighting || false,
          frontPowerOutlet: editData?.comfort?.frontPowerOutlet || false
        },
        brochureLink: editData?.brochureLink || 'https://example.com/brochure.pdf'
      },

      // Truck Specs (Similar to Car Specs with relevant modifications)
       
      truckSpecs: {
        dimensions: {
          overallLength: editData?.dimensions?.overallLength || '',      // e.g., "8.5 meters"
          overallWidth: editData?.dimensions?.overallWidth || '',       // e.g., "2.5 meters"
          overallHeight: editData?.dimensions?.overallHeight || '',      // e.g., "3.8 meters"
          wheelBase: editData?.dimensions?.wheelBase || '',          // e.g., "4.2 meters"
          groundClearance: editData?.dimensions?.groundClearance || '',    // e.g., "30 cm"
          kerbWeight: editData?.dimensions?.kerbWeight ||   '',         // e.g., "6500 kg"
          bootSpace: editData?.dimensions?.bootSpace || '',
          seatingCapacity: editData?.dimensions?.seatingCapacity || '',
          doors: editData?.dimensions?.doors || ''
        },
        
        engine: {
          type: editData?.engine?.type || '',              // Diesel/Petrol/CNG
          displacement: editData?.engine?.displacement || '',       // e.g., 5000 (cc)
          horsepower: editData?.engine?.horsepower || '',        // e.g., "400 HP @ 2100 RPM"
          torque: editData?.engine?.torque || '',            // e.g., "1850 Nm @ 1200 RPM"
        },
  
        transmission: {
          type: editData?.transmission?.type || 'Manual',        // Manual/Automatic/AMT
          powerTakeOff: editData?.transmission?.powerTakeOff || false,   // Yes/No
        },
  
        cargo: {

          loadCapacity: editData?.cargo?.loadCapacity || '',      // e.g., "25,000 kg"
          cargoLength: editData?.cargo?.cargoLength || '',       // e.g., "6.2 meters"
          cargoWidth: editData?.cargo?.cargoWidth || '',        // e.g., "2.4 meters"
          cargoHeight: editData?.cargo?.cargoHeight || '',       // e.g., "2.4 meters"
          cargoType: editData?.cargo?.cargoType || []          // e.g., ["Container", "Flatbed", "Tanker"]
        },
  
        axleConfiguration: {
          numberOfAxles: editData?.axleConfiguration?.numberOfAxles || 2,      // e.g., 2, 3, or 4
          wheelConfiguration: editData?.axleConfiguration?.wheelConfiguration || '', // e.g., "6x4", "4x2"
          maxAxleLoad: editData?.axleConfiguration?.maxAxleLoad || ''        // e.g., "7,100 kg"
        },
  
        chassis: {
          frameType: editData?.chassis?.frameType || '',         // e.g., "Ladder Frame"
          suspensionType: {
            front: editData?.chassis?.suspensionType?.front || '',           // e.g., "Parabolic Leaf Springs"
            rear: editData?.chassis?.suspensionType?.rear || ''            // e.g., "Air Suspension"
          },
          airBrakeSystem: editData?.chassis?.airBrakeSystem || false  // Yes/No
        },
  
        cabin: {
          type: editData?.cabin?.type || '',             // Day Cab/Sleeper Cab
          sleepingBerths: editData?.cabin?.sleepingBerths || 0     // e.g., 1 or 2
        },
  
        fuel: {
          tankCapacity: editData?.fuel?.tankCapacity || '',     // e.g., 400 (liters)
          adBlueCapacity: editData?.fuel?.adBlueCapacity || 0    // e.g., 75 (liters)
        },
  
        safety: {
          abs: editData?.safety?.abs || false,           // Yes/No
          hillAssist: editData?.safety?.hillAssist || false,    // Yes/No
          trailerStabilityControl: editData?.safety?.trailerStabilityControl || false  // Yes/No
        },
  
        warranty: {
          vehicle: editData?.warranty?.vehicle || '',          // e.g., "2 years/200,000 km"
          engine: editData?.warranty?.engine || ''           // e.g., "3 years/300,000 km"
        },
  
        certification: {
          emissionStandard: editData?.certification?.emissionStandard || ''  // e.g., "Euro 6"
        }
      }
    },

    validate: {
      // Add validation rules as needed
      // type: (value) => (!value ? 'Vehicle type is required' : null),
      // make: (value) => (!value ? 'Make is required' : null),
      // model: (value) => (!value ? 'Model is required' : null),
      // ... add more validation rules
    }
  });

    // Function to recursively merge edit data with initial values
    // const mergeWithInitialValues = (initial, edit) => {
    //   if (!edit) return initial;
  
    //   const merged = { ...initial };
      
    //   Object.keys(initial).forEach(key => {
    //     if (edit.hasOwnProperty(key)) {
    //       if (typeof initial[key] === 'object' && !Array.isArray(initial[key]) && initial[key] !== null) {
    //         merged[key] = mergeWithInitialValues(initial[key], edit[key]);
    //       } else {
    //         merged[key] = edit[key];
    //       }
    //     }
    //   });
  
    //   return merged;
    // };
    
  
  const handleSubmit = (values) => {
    if(editData){ 
      updateVehicle({vehicleId: "6767194ac0e9f5410d3b7f4e", ...values}).then((res) => {
        console.log("res", res)
      })
    }else{
      createVehicle(values).then((res) => {
        console.log("res", res)
      })
    }
    console.log("values", values) 
  };

  console.log("formdata", form.values)
  return {
    form,
    handleSubmit: form.onSubmit(handleSubmit)
  };
};