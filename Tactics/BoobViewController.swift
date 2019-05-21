//
//  BoobViewController.swift
//  tactics
//

import UIKit
import Alamofire
import SwiftyJSON

enum CaressingBodyPart {
    case hand
    case fingers
    case tongue
    case lips
    case penis
}

class BoobViewController: UIViewController {
    
    var currentCaressingBodyPart : CaressingBodyPart?
    
    @IBOutlet weak var boob: UIView!
    @IBOutlet weak var areola: UIView!
    @IBOutlet weak var nipple: UIView!
    
    @IBOutlet weak var statusDisplay: UILabel!
    
    @IBAction func feelRotationFromAreola(_ gestureRecognizer : UIRotationGestureRecognizer ) {
        guard gestureRecognizer.view == self.areola else { return }
        if (currentCaressingBodyPart == CaressingBodyPart.tongue &&
            abs(gestureRecognizer.velocity) > 3.2){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:5.5, part:"areola")
                gestureRecognizer.view?.transform = (gestureRecognizer.view?.transform.scaledBy(x: 1.02, y: 1.02))!
            }
        }
    }
    
    @IBAction func feelPinchFromNipple(_ gestureRecognizer : UIPinchGestureRecognizer ) {
        guard gestureRecognizer.view == self.nipple else { return }
        if ((currentCaressingBodyPart == CaressingBodyPart.fingers || currentCaressingBodyPart == CaressingBodyPart.lips) &&
            abs(gestureRecognizer.velocity) > 2.6 &&
            gestureRecognizer.scale < 1.3){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:6, part:"nipple")
                gestureRecognizer.view?.transform = (gestureRecognizer.view?.transform.scaledBy(x: 1.025, y: 1.025))!
            }
        }
    }
    
    @IBAction func feelPinchFromBoob(_ gestureRecognizer : UIPinchGestureRecognizer ) {
        guard gestureRecognizer.view == self.boob else { return }
        if (currentCaressingBodyPart == CaressingBodyPart.hand &&
            abs(gestureRecognizer.velocity) > 2 &&
            gestureRecognizer.scale < 8){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:4, part:"boob")
                gestureRecognizer.view?.transform = (gestureRecognizer.view?.transform.scaledBy(x: 1.01, y: 1.01))!
            }
        }
    }
    
    var totalArousal : CGFloat = 2
    var arousalInitiatedFlag = false
    var arousalId : String?
    var arousedBodyParts : [String]?
    
    @IBAction func getPartnersCaressingBodyPart(_ sender: Any) {
        switch segmentedControl.selectedSegmentIndex
        {
        case 0:
            currentCaressingBodyPart = CaressingBodyPart.hand
        case 1:
            currentCaressingBodyPart = CaressingBodyPart.fingers
        case 2:
            currentCaressingBodyPart = CaressingBodyPart.tongue
        case 3:
            currentCaressingBodyPart = CaressingBodyPart.lips
        case 3:
            currentCaressingBodyPart = CaressingBodyPart.penis
        default:
            break
        }
    }
    
    // get to some point, feel orgasm -> petit sketch for each part, maybe i need this later for the whole game
    // gotta do actual run - checking values are appropriate
    
    // get arousal id and treat this as put request
    func increaseArousal(inputLevel:Int, part:String){
        print(➕✨💧✨💧✨💧✨💧✨💧✨💧✨➕)
        
        arousedBodyParts?.append(part)
        
        totalArousal = totalArousal + inputLevel
        var arousalStage = totalArousal.rounded(.down)
        self.statusDisplay.text = "🚨 : " +  arousalStage
        
        if !arousalInitiatedFlag {
            let newArousalData: Parameters = [
                "created_at": Date(),
                "stimuli": ["touch"],
                "resp_parts": arousedBodyParts,
                "stage": arousalStage
            ]
            Alamofire.request("http://142.93.61.73:4000/api/arousal", method: .post, parameters: newArousalData, encoding: JSONEncoding.default).responseJSON { response in
                if let json = response.result.value {
                    let responseData = JSON(data: json)
                    if let retrievedArousalId = responseData["arousal_id"] {
                        arousalId = retrievedArousalId
                    }
                }
            }
            arousalInitiatedFlag = true
        }else{
            let updatedArousalData: Parameters = [
                "resp_parts": arousedBodyParts,
                "stage": arousalStage
            ]
            Alamofire.request("http://142.93.61.73:4000/api/arousal/"+arousalId, method: .put, parameters: updatedArousalData, encoding: JSONEncoding.default)
        }
        
    }

}
