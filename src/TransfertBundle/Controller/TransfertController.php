<?php

namespace TransfertBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\MimeType\FileinfoMimeTypeGuesser;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class TransfertController extends Controller
{
    public function indexAction()
    {
        return $this->render('TransfertBundle:Home:index.html.twig');
    }


    public function getToken($ln = 8) {
        return bin2hex(openssl_random_pseudo_bytes((int) $ln / 2));
    }

    public function getFilesAction()
    {

        $finder = new Finder();

        $finder->files()->in(__DIR__.'/../../../web/uploads/transferts/');

        $myFiles = [];

        foreach ($finder as $file) {
            $theFile = [];
            $theFile['id'] = substr($file->getRelativePathname(), 0, 8);
            $theFile['name'] = substr($file->getRelativePathname(), 9);

            $myFiles[]= $theFile;
        }
        return new JsonResponse($myFiles);
//        return $this->render('TransfertBundle:Home:index.html.twig');
    }



    public function getFileAction(Request $request)
    {
        $code = $request->get('code');

        $finder = new Finder();

        $finder->files()->in(__DIR__.'/../../../web/uploads/transferts/')->name($code.'-*');

        foreach ($finder as $file){
            $fileDownload = $file;
        }

        return $this->file($fileDownload, substr($fileDownload->getRelativePathname(), 9));

    }
}
