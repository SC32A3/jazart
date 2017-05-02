
package global.sesoc.jazart.detect;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

/*Sound capture*/
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.TargetDataLine;
import javax.sound.sampled.UnsupportedAudioFileException;

public class WavFileHelper implements Runnable {
	/* Implement analysis here */

	AudioFormat aFormat;
	AudioInputStream ais;

	TargetDataLine line;
	DataLine.Info info;
	PolyphonicPitchDetection mainProgram;
	int bitDepth;
	int bitSelection;
	int stereo;

	/* Constructor */
	public WavFileHelper(int bitDepthIn, PolyphonicPitchDetection mainProgram) {
		bitDepth = bitDepthIn;
		bitSelection = bitDepth / 8;
		this.mainProgram = mainProgram;
		stereo = 1; /* Capture mono */

		try {
			System.out.println("WFH\'s filepath" + mainProgram.filepath);
			ais = AudioSystem.getAudioInputStream(new File(mainProgram.filepath));
		} catch (UnsupportedAudioFileException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void run() {
		aFormat = ais.getFormat();
		info = new DataLine.Info(TargetDataLine.class, aFormat);
		System.out.println(info);
		try {
			int bufferSize = mainProgram.fftWindow * bitSelection * stereo;
			byte buffer[] = new byte[bufferSize];

			int read;
			while ((read = ais.read(buffer)) > 0) {
				if (read > 0) {
					if (bitSelection == 2) {
						short[] data = byteArrayToShortArray(buffer);

						Analysis analysis = new Analysis(data, mainProgram); 
						mainProgram.result.add(analysis.klapuri.f0s.get(0));
						//System.out.println(analysis.klapuri.f0s.get(0));
					}
				}
			}

			try {
				FileOutputStream fos = new FileOutputStream(new File("/userSource/makeMelody.dat"));
				ObjectOutputStream oos = new ObjectOutputStream(fos);
				oos.writeObject(mainProgram.result);
				oos.flush();
				oos.close();
				fos.close();
				
				new FrequencyAnalysis();
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception err) {
			err.printStackTrace();
		}
	}

	public static short[] byteArrayToShortArray(byte[] arrayIn) {
		short[] shortArray = new short[arrayIn.length / 2];
		for (int i = 0; i < shortArray.length; ++i) {
			shortArray[i] = (short) (((((int) arrayIn[2 * i + 1]) & 0XFF) << 8) | (((int) arrayIn[2 * i]) & 0XFF));
		}
		return shortArray;
	}
}
