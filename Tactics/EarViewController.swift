//
//  EarViewController.swift
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

class EarViewController: UIViewController {
    
    var currentCaressingBodyPart : CaressingBodyPart?
    
    @IBOutlet weak var earlobe: UIView!
    @IBOutlet weak var concha: UIView!
    @IBOutlet weak var antihelix: UIView!
    
    @IBOutlet weak var statusDisplay: UILabel!
    
    @IBAction func feelPinchFromEarlobe(_ gestureRecognizer : UIPinchGestureRecognizer ) {
        guard gestureRecognizer.view == self.earlobe else { return }
        if (currentCaressingBodyPart == CaressingBodyPart.lips &&
            abs(gestureRecognizer.velocity) > 3.5 &&
            gestureRecognizer.scale < 1.3){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:2, part:"earlobe")
            }
        }
    }
    
    @IBAction func feelSwipeFromAntihelix(_ gestureRecognizer : UISwipeGestureRecognizer ) {
        guard gestureRecognizer.view == self.antihelix else { return }
        if (currentCaressingBodyPart == CaressingBodyPart.tongue &&
            gestureRecognizer.velocity > 5.0){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:3.5, part:"antihelix")
            }
        }
    }
    
    @IBAction func feelTapFromConcha(_ gestureRecognizer : UITapGestureRecognizer ) {
        guard gestureRecognizer.view == self.concha else { return }
        gestureRecognizer.numberOfTapsRequired = 4
        if (currentCaressingBodyPart == CaressingBodyPart.tongue){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:2, part:"concha")
            }
        }
    }
    
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
    
    var totalArousal : CGFloat = 2
    var arousalInitiatedFlag = false
    var arousalId : String?
    var arousedBodyParts : [String]?
    
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
