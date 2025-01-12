#if __has_include("React/RCTBridgeModule.h")
  #import <React/RCTBridgeModule.h>
#else
  #import "RCTBridgeModule.h"
#endif

#if __has_include("React/RCTEventEmitter.h")
  #import <React/RCTEventEmitter.h>
#else
  #import "RCTEventEmitter.h"
#endif

#import <Batch/Batch.h>

#define PluginVersion "ReactNative/8.1.2"

@interface RNBatch : RCTEventEmitter <RCTBridgeModule>

+ (void)start;

@property (nonatomic, strong) NSMutableDictionary<NSString *, BatchInboxFetcher *> *batchInboxFetcherMap;

@end
