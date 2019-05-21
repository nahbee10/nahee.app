//
//  VulvaViewController.swift
//  tactics
//

import UIKit
import Alamofire
import SwiftyJSON
import CoreGraphics

enum CaressingBodyPart {
    case hand
    case fingers
    case tongue
    case lips
    case penis
}

class VulvaViewController: UIViewController {
    
    var currentCaressingBodyPart : CaressingBodyPart?
    
    @IBOutlet weak var clitoris: UIView!
    @IBOutlet weak var vagina: UIView!
    @IBOutlet weak var fourchette: UIView!
    @IBOutlet weak var anus: UIView!
    
    @IBOutlet weak var statusDisplay: UILabel!
    
    @IBAction func feelRotationFromClitoris(_ gestureRecognizer : UIRotationGestureRecognizer ) {
        guard gestureRecognizer.view == self.clitoris else { return }
        if (currentCaressingBodyPart == CaressingBodyPart.penis &&
            abs(gestureRecognizer.velocity) > 6.4){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:9, part:"clitoris")
                gestureRecognizer.view?.transform = (gestureRecognizer.view?.transform.scaledBy(x: 1.1, y: 1.1))!
            }
        }
    }
    
    @IBAction func feelTapFromClitoris(_ gestureRecognizer : UITapGestureRecognizer ) {
        guard gestureRecognizer.view == self.clitoris else { return }
        gestureRecognizer.numberOfTapsRequired = 15
        if (currentCaressingBodyPart == CaressingBodyPart.penis){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:8, part:"clitoris")
                gestureRecognizer.view?.transform = (gestureRecognizer.view?.transform.scaledBy(x: 1.09, y: 1.09))!
            }
        }
    }
    
    @IBAction func feelPinchFromClitoris(_ gestureRecognizer : UIPinchGestureRecognizer ) {
        guard gestureRecognizer.view == self.clitoris else { return }
        if (currentCaressingBodyPart == CaressingBodyPart.lips &&
            abs(gestureRecognizer.velocity) > 4.2 &&
            gestureRecognizer.scale < 0.8){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:7.5, part:"clitoris")
                gestureRecognizer.view?.transform = (gestureRecognizer.view?.transform.scaledBy(x: 1.07, y: 1.07))!
            }
        }
    }
    
    @IBAction func feelPanFromVagina(_ gestureRecognizer : UIPanGestureRecognizer ) {
        guard gestureRecognizer.view == self.vagina else { return }
        var panVelocity = gestureRecognizer.velocity(in:vagina);
        var speed = hypot(panVelocity.x.distance(to: 0), panVelocity.y.distance(to: 0))
        if ((currentCaressingBodyPart == CaressingBodyPart.penis || currentCaressingBodyPart == CaressingBodyPart.fingers) &&
            speed > 5.0){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:5.5, part:"vagina")
                gestureRecognizer.view?.transform = (gestureRecognizer.view?.transform.scaledBy(x: 0.9, y: 0.9))!
            }
        }
    }
    
    @IBAction func feelTapFromFourchette(_ gestureRecognizer : UITapGestureRecognizer ) {
        guard gestureRecognizer.view == self.fourchette else { return }
        gestureRecognizer.numberOfTapsRequired = 14
        if (currentCaressingBodyPart == CaressingBodyPart.fingers){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:1.6, part:"fourchette")
            }
        }
    }
    
    @IBAction func feelRotationFromAnus(_ gestureRecognizer : UIRotationGestureRecognizer ) {
        guard gestureRecognizer.view == self.anus else { return }
        if (currentCaressingBodyPart == CaressingBodyPart.tongue &&
            abs(gestureRecognizer.velocity) > 5.0){
            if gestureRecognizer.state == .changed {
                increaseArousal(inputLevel:4.1, part:"anus")
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
        case 4:
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
