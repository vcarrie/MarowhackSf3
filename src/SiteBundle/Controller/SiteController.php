<?php

namespace SiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class SiteController extends Controller
{
    public function indexAction()
    {

        return $this->render('SiteBundle:Home:index.html.twig');
    }

    public function ShRandomAction(){
        return $this->render('SiteBundle:Home:SHRandom.twig.html');
    }

    public function dunsparceAction(){
        return $this->render('SiteBundle:Home:dunsparce.html.twig');
    }

    public function ftpAction(){
        return $this->render('SiteBundle:Home:dunsparce.twig.html');
    }

    public function drifblimAction(){
        return $this->render('SiteBundle:Home:drifblim.html.twig');
    }
}
